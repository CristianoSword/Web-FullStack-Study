$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreateBucket = "aws s3api create-bucket --bucket study-static-assets-bucket --region us-east-1"
  UploadIndex = "aws s3 cp public/index.html s3://study-static-assets-bucket/index.html --content-type text/html"
  UploadCss = "aws s3 cp public/assets/app.css s3://study-static-assets-bucket/assets/app.css --content-type text/css"
  PutPolicy = "aws s3api put-bucket-policy --bucket study-static-assets-bucket --policy file://policies/public-read-bucket-policy.json"
  EnableWebsite = "aws s3 website s3://study-static-assets-bucket --index-document index.html"
}
