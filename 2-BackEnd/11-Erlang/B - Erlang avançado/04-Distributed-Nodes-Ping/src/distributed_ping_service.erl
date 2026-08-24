-module(distributed_ping_service).
-behaviour(gen_server).

-export([
    start_link/0,
    run_demo/0,
    validate_report/1
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include_lib("eunit/include/eunit.hrl").
-include("distributed_ping.hrl").

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

run_demo() ->
    gen_server:call(?MODULE, run_demo, 60000).

validate_report(Report) ->
    case Report of
        #cluster_report{peers = Peers, results = Results} when length(Peers) =:= 2, length(Results) =:= 2 ->
            case lists:all(fun(#ping_result{status = Status}) -> Status =:= pong end, Results) of
                true ->
                    ok;
                false ->
                    {error, ping_failed}
            end;
        _ ->
            {error, incomplete_cluster_report}
    end.

init([]) ->
    {ok, #{}}.

handle_call(run_demo, _From, State) ->
    case run_cluster_demo() of
        {ok, Report} ->
            {reply, {ok, Report}, State};
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call(_Request, _From, State) ->
    {reply, {error, unsupported_call}, State}.

handle_cast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVersion, State, _Extra) ->
    {ok, State}.

run_cluster_demo() ->
    ensure_origin_distribution(),
    {ok, AlphaNode, AlphaPort} = start_external_node("alpha_ping"),
    try
        {ok, BetaNode, BetaPort} = start_external_node("beta_ping"),
        try
            AlphaTarget = #node_target{name = <<"alpha">>, full_node = AlphaNode, controller = AlphaPort},
            BetaTarget = #node_target{name = <<"beta">>, full_node = BetaNode, controller = BetaPort},
            Results = [
                make_ping_result(AlphaNode, BetaNode, rpc:call(AlphaNode, net_adm, ping, [BetaNode])),
                make_ping_result(BetaNode, AlphaNode, rpc:call(BetaNode, net_adm, ping, [AlphaNode]))
            ],
            Report = #cluster_report{
                origin_node = node(),
                peers = [AlphaTarget, BetaTarget],
                results = Results
            },
            case validate_report(Report) of
                ok ->
                    {ok, Report};
                {error, Reason} ->
                    {error, Reason}
            end
        after
            stop_node_safe(BetaNode, BetaPort)
        end
    after
        stop_node_safe(AlphaNode, AlphaPort)
    end.

ensure_origin_distribution() ->
    case node() of
        nonode@nohost ->
            ensure_epmd(),
            {ok, _} = net_kernel:start([origin_ping, shortnames]),
            ok;
        _ ->
            ok
    end.

make_ping_result(From, To, Status) ->
    #ping_result{from = From, to = To, status = Status}.

start_external_node(Prefix) ->
    Host = hostname(),
    Suffix = integer_to_list(erlang:unique_integer([positive])),
    Name = Prefix ++ "_" ++ Suffix,
    Node = list_to_atom(Name ++ "@" ++ Host),
    Cookie = atom_to_list(erlang:get_cookie()),
    Erl = erl_path(),
    Port = open_port(
        {spawn_executable, Erl},
        [
            hide,
            exit_status,
            {args, ["-sname", Name, "-setcookie", Cookie, "-noshell", "-eval", "receive after infinity -> ok end."]}
        ]
    ),
    case wait_for_node(Node, 80) of
        {ok, _} ->
            {ok, Node, Port};
        {error, Reason} ->
            port_close_safe(Port),
            {error, Reason}
    end.

wait_for_node(_Node, 0) ->
    {error, node_boot_timeout};
wait_for_node(Node, AttemptsLeft) ->
    timer:sleep(100),
    case net_adm:ping(Node) of
        pong ->
            {ok, Node};
        pang ->
            wait_for_node(Node, AttemptsLeft - 1)
    end.

hostname() ->
    {ok, Host} = inet:gethostname(),
    Host.

erl_path() ->
    [Path | _] = filelib:wildcard(filename:join([code:root_dir(), "erts-*", "bin", "erl.exe"])),
    Path.

stop_node_safe(undefined, _Port) ->
    ok;
stop_node_safe(Node, Port) when is_atom(Node) ->
    catch rpc:call(Node, erlang, halt, []),
    wait_for_node_down(Node, 40),
    port_close_safe(Port),
    ok.

wait_for_node_down(_Node, 0) ->
    ok;
wait_for_node_down(Node, AttemptsLeft) ->
    timer:sleep(100),
    case net_adm:ping(Node) of
        pang ->
            ok;
        pong ->
            wait_for_node_down(Node, AttemptsLeft - 1)
    end.

ensure_epmd() ->
    case epmd_path() of
        undefined ->
            ok;
        Path ->
            os:cmd("cmd /c start \"\" \"" ++ Path ++ "\""),
            timer:sleep(500),
            ok
    end.

epmd_path() ->
    case filelib:wildcard(filename:join([code:root_dir(), "erts-*", "bin", "epmd.exe"])) of
        [Path | _] ->
            Path;
        [] ->
            undefined
    end.

port_close_safe(Port) when is_port(Port) ->
    catch port_close(Port),
    ok;
port_close_safe(_Port) ->
    ok.

validate_report_test() ->
    GoodReport = #cluster_report{
        origin_node = 'origin_ping@host',
        peers = [
            #node_target{name = <<"alpha">>, full_node = 'alpha@host', controller = self()},
            #node_target{name = <<"beta">>, full_node = 'beta@host', controller = self()}
        ],
        results = [
            #ping_result{from = 'alpha@host', to = 'beta@host', status = pong},
            #ping_result{from = 'beta@host', to = 'alpha@host', status = pong}
        ]
    },
    ?assertEqual(ok, validate_report(GoodReport)).

invalid_report_test() ->
    ?assertEqual(
        {error, incomplete_cluster_report},
        validate_report(#cluster_report{origin_node = node(), peers = [], results = []})
    ),
    BadReport = #cluster_report{
        origin_node = node(),
        peers = [
            #node_target{name = <<"alpha">>, full_node = 'alpha@host', controller = self()},
            #node_target{name = <<"beta">>, full_node = 'beta@host', controller = self()}
        ],
        results = [
            #ping_result{from = 'alpha@host', to = 'beta@host', status = pang},
            #ping_result{from = 'beta@host', to = 'alpha@host', status = pong}
        ]
    },
    ?assertEqual({error, ping_failed}, validate_report(BadReport)).

report_shape_test() ->
    Report = #cluster_report{
        origin_node = node(),
        peers = [
            #node_target{name = <<"alpha">>, full_node = 'alpha@host', controller = external},
            #node_target{name = <<"beta">>, full_node = 'beta@host', controller = external}
        ],
        results = [
            #ping_result{from = 'alpha@host', to = 'beta@host', status = pong},
            #ping_result{from = 'beta@host', to = 'alpha@host', status = pong}
        ]
    },
    ?assertEqual(ok, validate_report(Report)).
