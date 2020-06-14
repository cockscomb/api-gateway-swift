#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ApiGatewaySwiftStack } from "../lib/api-gateway-swift-stack";

const app = new cdk.App();
new ApiGatewaySwiftStack(app, "ApiGatewaySwiftStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
