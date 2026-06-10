<?php
namespace App\Jobs;

use App\Job;

class ProcessImageJob extends Job
{
    public function handle(): void
    {
        $imagePath = $this->getPayloadValue('image_path');
        $operations = $this->getPayloadValue('operations', []);

        echo "Processing image: {$imagePath}\n";
        foreach ($operations as $operation) {
            echo "Applying operation: {$operation}\n";
            sleep(1);
        }
        echo "Image processed successfully!\n";
    }
}
