$ErrorActionPreference = "Stop"

[pscustomobject]@{
  AddDomain = "heroku domains:add app.example.com --app study-custom-domain-app"
  ShowDomains = "heroku domains --app study-custom-domain-app"
  EnableAcm = "heroku certs:auto:enable --app study-custom-domain-app"
  ShowAcm = "heroku certs:auto --app study-custom-domain-app"
  VerifyHttps = "curl https://app.example.com/health"
}
