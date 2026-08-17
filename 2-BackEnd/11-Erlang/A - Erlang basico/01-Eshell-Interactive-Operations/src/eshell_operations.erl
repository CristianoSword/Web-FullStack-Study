-module(eshell_operations).

-export([
    new_session/3,
    sum_numbers/1,
    average_numbers/1,
    even_numbers/1,
    summary/1
]).

-include("eshell_operations.hrl").

new_session(Label, Numbers, Tags) ->
    #operation_session{
        label = Label,
        numbers = Numbers,
        tags = Tags
    }.

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
