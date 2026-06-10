<?php
namespace App\Jobs;

use App\Job;

class SendEmailJob extends Job
{
    public function handle(): void
    {
        $to = $this->getPayloadValue('to');
        $subject = $this->getPayloadValue('subject');
        $body = $this->getPayloadValue('body');

        echo "Sending email to: {$to}\n";
        echo "Subject: {$subject}\n";
        echo "Body: {$body}\n";
        echo "Email sent successfully!\n";
    }
}
