import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ApiGatewaySwift from '../lib/api-gateway-swift-stack';

test('Stack', () => {
    const app = new cdk.App();
    const stack = new ApiGatewaySwift.ApiGatewaySwiftStack(app, 'MyTestStack');
    expectCDK(stack).to(haveResource('AWS::Lambda::Function'))
});
