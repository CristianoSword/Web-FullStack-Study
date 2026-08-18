-module(pattern_types).

-export_type([user_payload/0]).

-include("pattern_payloads.hrl").

-type user_payload() :: #user_payload{}.
