import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { join } from 'path'
// import * as sqs from '@aws-cdk/aws-sqs';

export class SpaceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, 'helloLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '..','services', 'hello')),
      handler: 'hello.main'
    })

  }
}
