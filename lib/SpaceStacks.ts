import * as cdk from '@aws-cdk/core';
/* import * as lambda from '@aws-cdk/aws-lambda'
import { Code, Runtime } from '@aws-cdk/aws-lambda' */
import { join } from 'path'
import * as apigw from '@aws-cdk/aws-apigateway'
import { GenericTable } from './GenericTable';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { handler } from '../services/node-lambda/hello';
import { PolicyStatement } from '@aws-cdk/aws-iam';

// import * as sqs from '@aws-cdk/aws-sqs';

export class SpaceStack extends cdk.Stack {

private api = new apigw.RestApi(this, 'SpaceApi')
private spacesTable = new GenericTable(
  'SpacesTable',
  'spaceId',
  this
)

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* const helloLambda = new lambda.Function(this, 'helloLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '..','services', 'hello')),
      handler: 'hello.main'
    }) */



    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler',

    })

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addNotResources('*');
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);



    //Hello Api Lambda integration: 
    const helloLambdaIntegration = new apigw.LambdaIntegration(helloLambdaNodeJs)
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)


  }
}
