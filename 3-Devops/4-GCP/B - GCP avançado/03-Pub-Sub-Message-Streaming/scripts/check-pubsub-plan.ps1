$root = Split-Path -Parent $PSScriptRoot
$topic = Get-Content (Join-Path $root 'config/topic-spec.json') | ConvertFrom-Json
$subscription = Get-Content (Join-Path $root 'config/subscription-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateTopic         = "gcloud pubsub topics create $($topic.topicName) --project $($topic.projectId)"
  CreateDeadLetter    = "gcloud pubsub topics create $($topic.deadLetterTopic) --project $($topic.projectId)"
  CreateSchema        = "gcloud pubsub schemas create $($topic.schemaName) --type=$($topic.schemaType.ToLower()) --definition-file=config/event-schema.json"
  CreateSubscription  = "gcloud pubsub subscriptions create $($subscription.pullSubscription.name) --topic $($topic.topicName) --dead-letter-topic $($topic.deadLetterTopic)"
  PublishSampleEvents = 'node publisher/publish-order-events.js'
  StartPullWorker     = 'node subscriber/pull-worker.js'
} | Format-List
