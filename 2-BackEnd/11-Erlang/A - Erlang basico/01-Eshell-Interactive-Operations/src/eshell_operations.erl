-module(eshell_operations).

-export([
    new_session/3,
    sum_numbers/1,
    average_numbers/1,
    even_numbers/1,
    summary/1
]).

-include_lib("eunit/include/eunit.hrl").
-include("eshell_operations.hrl").

new_session(Label, Numbers, Tags)
    when is_binary(Label),
         is_list(Numbers),
         is_list(Tags) ->
    validate_numbers(Numbers),
    validate_tags(Tags),
    #operation_session{
        label = Label,
        numbers = Numbers,
        tags = Tags
    };
new_session(Label, Numbers, Tags) ->
    erlang:error({invalid_session, Label, Numbers, Tags}).

sum_numbers(#operation_session{numbers = Numbers}) ->
    lists:sum(Numbers).

average_numbers(#operation_session{numbers = []}) ->
    0.0;
average_numbers(#operation_session{numbers = Numbers}) ->
    lists:sum(Numbers) / length(Numbers).

even_numbers(#operation_session{numbers = Numbers}) ->
    [Number || Number <- Numbers, Number rem 2 =:= 0].

summary(#operation_session{label = Label, numbers = Numbers, tags = Tags} = Session) ->
    #{
        label => Label,
        total => sum_numbers(Session),
        average => average_numbers(Session),
        count => length(Numbers),
        even_numbers => even_numbers(Session),
        tags => Tags
    }.

validate_numbers([]) ->
    ok;
validate_numbers([Head | Tail]) when is_integer(Head) ->
    validate_numbers(Tail);
validate_numbers(_Other) ->
    erlang:error(invalid_numbers).

validate_tags([]) ->
    ok;
validate_tags([Head | Tail]) when is_atom(Head) ->
    validate_tags(Tail);
validate_tags(_Other) ->
    erlang:error(invalid_tags).

summary_test() ->
    Session = new_session(<<"qa">>, [2, 3, 8], [shell, eunit]),
    Summary = summary(Session),
    ?assertEqual(13, maps:get(total, Summary)),
    ?assertEqual([2, 8], maps:get(even_numbers, Summary)).
