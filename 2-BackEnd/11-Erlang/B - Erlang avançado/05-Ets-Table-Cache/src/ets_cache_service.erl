-module(ets_cache_service).
-behaviour(gen_server).
-compile({no_auto_import, [get/1]}).

-export([
    start_link/0,
    put/3,
    get/1,
    delete/1,
    list_keys/0,
    metrics/0,
    evict_expired/0
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
-include("ets_cache.hrl").

-define(CACHE_TABLE, ets_cache_table).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

put(Key, Value, TtlSeconds) ->
    gen_server:call(?MODULE, {put, Key, Value, TtlSeconds}).

get(Key) ->
    gen_server:call(?MODULE, {get, Key}).

delete(Key) ->
    gen_server:call(?MODULE, {delete, Key}).

list_keys() ->
    gen_server:call(?MODULE, list_keys).

metrics() ->
    gen_server:call(?MODULE, metrics).

evict_expired() ->
    gen_server:call(?MODULE, evict_expired).

init([]) ->
    ets:new(?CACHE_TABLE, [named_table, public, set, {read_concurrency, true}]),
    {ok, #cache_metrics{}}.

handle_call({put, Key, Value, TtlSeconds}, _From, State) ->
    case validate_put(Key, TtlSeconds) of
        ok ->
            Expiration = now_seconds() + TtlSeconds,
            Entry = #cache_entry{key = Key, value = Value, expires_at = Expiration},
            ets:insert(?CACHE_TABLE, {Key, Entry}),
            {reply, {ok, Entry}, State#cache_metrics{writes = State#cache_metrics.writes + 1}};
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({get, Key}, _From, State) ->
    case validate_key(Key) of
        ok ->
            case ets:lookup(?CACHE_TABLE, Key) of
                [{Key, #cache_entry{value = Value, expires_at = ExpiresAt}}] ->
                    case ExpiresAt > now_seconds() of
                        true ->
                            {reply, {ok, Value}, State#cache_metrics{hits = State#cache_metrics.hits + 1}};
                        false ->
                            ets:delete(?CACHE_TABLE, Key),
                            {reply, not_found, State#cache_metrics{misses = State#cache_metrics.misses + 1}}
                    end;
                [] ->
                    {reply, not_found, State#cache_metrics{misses = State#cache_metrics.misses + 1}}
            end;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({delete, Key}, _From, State) ->
    case validate_key(Key) of
        ok ->
            Deleted = ets:member(?CACHE_TABLE, Key),
            ets:delete(?CACHE_TABLE, Key),
            Reply = case Deleted of true -> ok; false -> not_found end,
            {reply, Reply, State#cache_metrics{deletes = State#cache_metrics.deletes + 1}};
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call(list_keys, _From, State) ->
    Keys = [Key || {Key, _Entry} <- ets:tab2list(?CACHE_TABLE)],
    {reply, Keys, State};
handle_call(metrics, _From, State) ->
    {reply, State, State};
handle_call(evict_expired, _From, State) ->
    Count = evict_expired_entries(ets:first(?CACHE_TABLE), 0),
    {reply, {ok, Count}, State};
handle_call(_Request, _From, State) ->
    {reply, {error, unsupported_call}, State}.

handle_cast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    catch ets:delete(?CACHE_TABLE),
    ok.

code_change(_OldVersion, State, _Extra) ->
    {ok, State}.

evict_expired_entries('$end_of_table', Count) ->
    Count;
evict_expired_entries(Key, Count) ->
    NextKey = ets:next(?CACHE_TABLE, Key),
    case ets:lookup(?CACHE_TABLE, Key) of
        [{Key, #cache_entry{expires_at = ExpiresAt}}] ->
            case ExpiresAt =< now_seconds() of
                true ->
                    ets:delete(?CACHE_TABLE, Key),
                    evict_expired_entries(NextKey, Count + 1);
                false ->
                    evict_expired_entries(NextKey, Count)
            end;
        _ ->
            evict_expired_entries(NextKey, Count)
    end.

now_seconds() ->
    erlang:system_time(second).

validate_put(Key, TtlSeconds) ->
    case {validate_key(Key), is_integer(TtlSeconds) andalso TtlSeconds > 0} of
        {ok, true} ->
            ok;
        {ok, false} ->
            {error, invalid_ttl};
        {{error, Reason}, _} ->
            {error, Reason}
    end.

validate_key(Key) when is_binary(Key), byte_size(Key) > 0 ->
    ok;
validate_key(_Key) ->
    {error, invalid_key}.
