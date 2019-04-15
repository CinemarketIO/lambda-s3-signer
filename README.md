# Lambda S3 Signer

This Lambda function signs S3 `putObject` requests for uploaders like Uppy.

## Installation

Serverless uses AWS' Parameter store for secret environment variables. There's
two parameters that need setting:

```bash
aws ssm put-parameter --name s3SignerSecretAccessKey \
    --type String --value ommited
aws ssm put-parameter --name s3SignerAccessKeyId \
    --type String --value ommited
aws ssm put-parameter --name s3SignerBucket \
    --type String --value ommited
```

Once you've set this and are logged into `awscli`, you can deploy by:

```bash
serverless deploy
```
