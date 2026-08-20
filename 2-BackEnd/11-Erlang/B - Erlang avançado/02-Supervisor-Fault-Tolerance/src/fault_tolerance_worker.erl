-module(fault_tolerance_worker).
-behaviour(gen_server).

-export([
    start_link/0,
    ping/0,
    status/0,
    crash/0,
    reset_crash_counter/0
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include("fault_tolerance.hrl").

-define(CRASH_COUNTER_KEY, {?MODULE, crash_counter}).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

ping() ->
    gen_server:call(?MODULE, ping).

status() ->
    gen_server:call(?MODULE, status).

crash() ->
    gen_server:call(?MODULE, crash).

reset_crash_counter() ->
    persistent_term:put(?CRASH_COUNTER_KEY, 0),
    ok.

init([]) ->
    CrashCount = persistent_term:get(?CRASH_COUNTER_KEY, 0),
    {ok, #worker_status{name = <<"resilient-worker">>, crash_count = CrashCount, heartbeat = 0}}.

handle_call(ping, _From, State = #worker_status{heartbeat = Heartbeat}) ->
    NextState = State#worker_status{heartbeat = Heartbeat + 1},
    {reply, pong, NextState};
handle_call(status, _From, State) ->
    {reply, State, State};
handle_call(crash, _From, State = #worker_status{crash_count = CrashCount}) ->
    persistent_term:put(?CRASH_COUNTER_KEY, CrashCount + 1),
    erlang:error({simulated_crash, CrashCount + 1}),
    {reply, ok, State};
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
