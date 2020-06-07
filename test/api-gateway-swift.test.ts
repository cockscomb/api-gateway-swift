import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ApiGatewaySwift from '../lib/api-gateway-swift-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ApiGatewaySwift.ApiGatewaySwiftStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
