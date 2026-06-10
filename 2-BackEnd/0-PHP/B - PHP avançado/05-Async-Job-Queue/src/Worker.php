<?php
namespace App;

class Worker
{
    private Queue $queue;
    private bool $running = false;

    public function __construct(Queue $queue)
    {
        $this->queue = $queue;
    }

    public function start(): void
    {
        $this->running = true;
        echo "Worker started. Press Ctrl+C to stop.\n";

        while ($this->running) {
            $jobData = $this->queue->pop();

            if ($jobData) {
                $this->processJob($jobData);
            } else {
                sleep(1);
            }
        }

        echo "Worker stopped.\n";
    }

    public function stop(): void
    {
        $this->running = false;
    }

    private function processJob(array $jobData): void
    {
        $className = $jobData['class'];
        $payload = $jobData['payload'];

        if (!class_exists($className)) {
            echo "Error: Job class {$className} not found\n";
            return;
        }

        try {
            $job = new $className($payload);
            $job->handle();
            echo "Job processed successfully: {$className}\n";
        } catch (\Exception $e) {
            echo "Error processing job: " . $e->getMessage() . "\n";
        }
    }
}
