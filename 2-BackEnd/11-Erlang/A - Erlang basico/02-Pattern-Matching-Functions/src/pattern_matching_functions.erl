-module(pattern_matching_functions).

-export([
    classify/1,
    describe_user/1,
    transform/1
]).

-include_lib("eunit/include/eunit.hrl").
-include("pattern_payloads.hrl").

classify({ok, Value}) ->
    {success, Value};
classify({error, Reason}) ->
    {failure, Reason};
classify([Head | Tail]) ->
    {list, Head, length(Tail)};
classify(#{type := event, name := Name}) ->
    {event, Name};
classify(#user_payload{role = admin, name = Name}) ->
    {admin_user, Name};
classify(_Other) ->
    unknown.

describe_user(#user_payload{role = admin, name = Name, status = active}) ->
    {priority, Name};
describe_user(#user_payload{role = guest, name = Name, status = pending}) ->
    {onboarding, Name};
describe_user(#user_payload{name = Name, status = Status}) ->
    {standard, Name, Status}.

transform({coords, X, Y}) when is_integer(X), is_integer(Y) ->
    #{x => X, y => Y};
transform(#{type := metric, value := Value}) when is_number(Value) ->
    Value * 2;
transform(Binary) when is_binary(Binary) ->
    byte_size(Binary);
transform(Other) ->
    Other.

classify_test() ->
    ?assertEqual({success, 42}, classify({ok, 42})),
    ?assertEqual({event, <<"deploy">>}, classify(#{type => event, name => <<"deploy">>})).
