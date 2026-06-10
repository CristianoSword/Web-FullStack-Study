<?php
namespace App;

class Queue
{
    private string $storagePath;

    public function __construct(string $storagePath)
    {
        $this->storagePath = $storagePath;
        if (!is_dir($this->storagePath)) {
            mkdir($this->storagePath, 0777, true);
        }
    }

    public function push(Job $job): string
    {
        $jobData = [
            'class' => get_class($job),
            'payload' => $job->getPayload(),
            'attempts' => 0,
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $jobId = uniqid('job_');
        $filePath = $this->storagePath . '/' . $jobId . '.json';
        file_put_contents($filePath, json_encode($jobData));

        return $jobId;
    }

    public function pop(): ?array
    {
        $files = glob($this->storagePath . '/*.json');
        if (empty($files)) {
            return null;
        }

        $filePath = $files[0];
        $jobData = json_decode(file_get_contents($filePath), true);
        
        unlink($filePath);

        return $jobData;
    }

    public function count(): int
    {
        return count(glob($this->storagePath . '/*.json'));
    }

    public function clear(): void
    {
        $files = glob($this->storagePath . '/*.json');
        foreach ($files as $file) {
            unlink($file);
        }
    }
}
