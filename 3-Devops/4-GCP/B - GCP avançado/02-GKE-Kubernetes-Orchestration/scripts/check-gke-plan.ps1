$root = Split-Path -Parent $PSScriptRoot
$cluster = Get-Content (Join-Path $root 'config/cluster-spec.json') | ConvertFrom-Json
$app = Get-Content (Join-Path $root 'config/app-spec.json') | ConvertFrom-Json

[pscustomobject]@{
  BuildImage         = "gcloud builds submit --tag $($app.containerImage)"
  ConnectCluster     = "gcloud container clusters get-credentials $($cluster.clusterName) --region $($cluster.region) --project $($cluster.projectId)"
  ApplyBootstrap     = 'kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/secret.yaml'
  ApplyWorkload      = 'kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/ingress.yaml -f k8s/hpa.yaml'
  RolloutStatus      = "kubectl rollout status deployment/$($app.deploymentName) -n $($app.namespace)"
  InspectAutoscaling = "kubectl get hpa $($app.hpaName) -n $($app.namespace)"
  InspectIngress     = "kubectl get ingress $($app.ingressName) -n $($app.namespace)"
} | Format-List
