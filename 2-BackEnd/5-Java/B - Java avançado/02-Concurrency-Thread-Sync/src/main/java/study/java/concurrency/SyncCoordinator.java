package study.java.concurrency;

import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;

public class SyncCoordinator {
  private final ReentrantLock lock = new ReentrantLock();
  private final Semaphore semaphore = new Semaphore(2);
  private int counter = 0;

  public SyncSnapshot incrementMany(int times) {
    lock.lock();
    try {
      semaphore.acquireUninterruptibly();
      counter += times;
      semaphore.release();
      return new SyncSnapshot(semaphore.availablePermits(), counter);
    } finally {
      lock.unlock();
    }
  }
}
