package com.study.qa;

import com.study.qa.service.ProgressCounter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class ProgressCounterConcurrentTest {

    @Test
    void incrementsSafelyAcrossMultipleThreads() throws Exception {
        ProgressCounter counter = new ProgressCounter();
        ExecutorService executor = Executors.newFixedThreadPool(8);
        CountDownLatch latch = new CountDownLatch(1);
        List<Future<?>> futures = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            futures.add(executor.submit(() -> {
                latch.await();
                counter.increment();
                return null;
            }));
        }

        latch.countDown();
        for (Future<?> future : futures) {
            future.get();
        }

        executor.shutdown();
        Assertions.assertEquals(100, counter.getValue());
    }
}
