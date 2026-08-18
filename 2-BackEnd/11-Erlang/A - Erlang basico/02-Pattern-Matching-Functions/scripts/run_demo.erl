-module(run_demo).
-export([main/0]).

-include("../src/pattern_payloads.hrl").

main() ->
    Admin = #user_payload{role = admin, name = <<"Ada">>, status = active},
    io:format("~p~n", [pattern_matching_functions:classify(Admin)]),
    io:format("~p~n", [pattern_matching_functions:describe_user(Admin)]),
    io:format("~p~n", [pattern_matching_functions:transform({coords, 5, 9})]),
    init:stop().
