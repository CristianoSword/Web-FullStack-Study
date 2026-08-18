-module(list_recursion_recurs).

-export([
    new_job/2,
    total/1,
    reverse_numbers/1,
    even_numbers/1,
    doubled_numbers/1,
    analyze/1
]).

-include_lib("eunit/include/eunit.hrl").
-include("list_recursion.hrl").

new_job(Label, Numbers) when is_binary(Label), is_list(Numbers) ->
    #list_job{label = Label, numbers = Numbers}.

total(#list_job{numbers = Numbers}) ->
    total(Numbers, 0).

reverse_numbers(#list_job{numbers = Numbers}) ->
    reverse_numbers(Numbers, []).

even_numbers(#list_job{numbers = Numbers}) ->
    reverse_numbers(even_numbers(Numbers, []), []).

doubled_numbers(#list_job{numbers = Numbers}) ->
    reverse_numbers(doubled_numbers(Numbers, []), []).

analyze(Job) ->
    #list_result{
        total = total(Job),
        reversed = reverse_numbers(Job),
        evens = even_numbers(Job),
        doubled = doubled_numbers(Job)
    }.

total([], Acc) ->
    Acc;
total([Head | Tail], Acc) ->
    total(Tail, Acc + Head).

reverse_numbers([], Acc) ->
    Acc;
reverse_numbers([Head | Tail], Acc) ->
    reverse_numbers(Tail, [Head | Acc]).

even_numbers([], Acc) ->
    Acc;
even_numbers([Head | Tail], Acc) when Head rem 2 =:= 0 ->
    even_numbers(Tail, [Head | Acc]);
even_numbers([_Head | Tail], Acc) ->
    even_numbers(Tail, Acc).

doubled_numbers([], Acc) ->
    Acc;
doubled_numbers([Head | Tail], Acc) ->
    doubled_numbers(Tail, [Head * 2 | Acc]).

analyze_test() ->
    Job = new_job(<<"numbers">>, [3, 4, 8, 11]),
    Result = analyze(Job),
    ?assertEqual(26, Result#list_result.total),
    ?assertEqual([11, 8, 4, 3], Result#list_result.reversed),
    ?assertEqual([4, 8], Result#list_result.evens),
    ?assertEqual([6, 8, 16, 22], Result#list_result.doubled).
