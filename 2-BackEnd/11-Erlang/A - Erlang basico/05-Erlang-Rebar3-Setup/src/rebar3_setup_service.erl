-module(rebar3_setup_service).
-behaviour(gen_server).

-export([
    start_link/0,
    bootstrap_report/0,
    bootstrap_targets/0,
    validate_bootstrap/0
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include("rebar3_setup.hrl").
-include_lib("eunit/include/eunit.hrl").

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

bootstrap_report() ->
    gen_server:call(?MODULE, bootstrap_report).

bootstrap_targets() ->
    [
        #bootstrap_target{name = app, src_dir = <<"src">>, module = rebar3_setup_app},
        #bootstrap_target{name = supervisor, src_dir = <<"src">>, module = rebar3_setup_sup},
        #bootstrap_target{name = service, src_dir = <<"src">>, module = rebar3_setup_service}
    ].

validate_bootstrap() ->
    Targets = bootstrap_targets(),
    Modules = [Target#bootstrap_target.module || Target <- Targets],
    case length(Modules) =:= length(lists:usort(Modules)) of
        true ->
            ok;
        false ->
            {error, duplicate_modules}
    end.

init([]) ->
    {ok, #{
        app_name => rebar3_setup,
        targets => bootstrap_targets(),
        notes => [
            <<"rebar.config defines src_dirs and erl_opts">>,
            <<"app.src wires the OTP application callback">>,
            <<"service module can be started under a supervisor tree">>
        ]
    }}.

handle_call(bootstrap_report, _From, State) ->
    Report = #bootstrap_report{
        app_name = maps:get(app_name, State),
        targets = maps:get(targets, State),
        notes = maps:get(notes, State)
    },
    {reply, Report, State};
handle_call(validate_bootstrap, _From, State) ->
    {reply, validate_bootstrap(), State};
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

bootstrap_targets_test() ->
    Targets = bootstrap_targets(),
    ?assertEqual(3, length(Targets)),
    ?assertEqual(ok, validate_bootstrap()).

bootstrap_report_test() ->
    {ok, Pid} = start_link(),
    try
        Report = bootstrap_report(),
        ?assertEqual(rebar3_setup, Report#bootstrap_report.app_name),
        ?assertEqual(3, length(Report#bootstrap_report.targets))
    after
        exit(Pid, shutdown)
    end.
