$ErrorActionPreference = "Stop"

[pscustomobject]@{
  BrowserLogin = "heroku login"
  InteractiveFallback = "heroku login -i"
  VerifyAccount = "heroku auth:whoami"
  SmokeCheck = "heroku apps"
}
