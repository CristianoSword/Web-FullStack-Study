// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library ElectionTypes {
    struct ElectionConfig {
        string title;
        uint64 startsAt;
        uint64 endsAt;
        string[] initialCandidates;
    }
}
