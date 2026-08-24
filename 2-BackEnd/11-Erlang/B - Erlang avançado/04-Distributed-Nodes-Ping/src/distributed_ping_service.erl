-module(distributed_ping_service).
-behaviour(gen_server).

-export([
    start_link/0,
    run_demo/0
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include("distributed_ping.hrl").

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

run_demo() ->
    gen_server:call(?MODULE, run_demo, 15000).

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
    CookieArg = io_lib:format("-setcookie ~s", [atom_to_list(erlang:get_cookie())]),
    {ok, AlphaPid, AlphaNode} = peer:start_link(#{
        name => peer:random_name("alpha"),
        wait_boot => 5000,
        args => [lists:flatten(CookieArg)]
    }),
    try
        {ok, BetaPid, BetaNode} = peer:start_link(#{
            name => peer:random_name("beta"),
            wait_boot => 5000,
            args => [lists:flatten(CookieArg)]
        }),
        try
            AlphaTarget = #node_target{name = <<"alpha">>, full_node = AlphaNode, controller = AlphaPid},
            BetaTarget = #node_target{name = <<"beta">>, full_node = BetaNode, controller = BetaPid},
            Results = [
                make_ping_result(AlphaNode, BetaNode, peer:call(AlphaPid, net_adm, ping, [BetaNode])),
                make_ping_result(BetaNode, AlphaNode, peer:call(BetaPid, net_adm, ping, [AlphaNode]))
            ],
            {ok, #cluster_report{
                origin_node = node(),
                peers = [AlphaTarget, BetaTarget],
                results = Results
            }}
        after
            stop_peer_safe(BetaPid)
        end
    after
        stop_peer_safe(AlphaPid)
    end.

ensure_origin_distribution() ->
    case node() of
        nonode@nohost ->
            {ok, _} = net_kernel:start([origin_ping, shortnames]),
            ok;
        _ ->
            ok
    end.

make_ping_result(From, To, Status) ->
    #ping_result{from = From, to = To, status = Status}.

stop_peer_safe(undefined) ->
    ok;
stop_peer_safe(Pid) when is_pid(Pid) ->
    catch peer:stop(Pid),
    ok.
