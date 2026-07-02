#pragma once

struct PoolState {
  int queued;
  int completed;
  int workers;
};
