import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as path from "path";
import { Builder } from "./builder";

export class ApiGatewaySwiftStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const code = new Builder({
      dir: path.join(__dirname, "../handler"),
      executable: "Handler",
    }).build();

    const handler = new lambda.Function(this, "Handler", {
      code,
      handler: "Handler",
      runtime: lambda.Runtime.PROVIDED,
    });

    new apigateway.LambdaRestApi(this, "Api", {
      handler,
    });
  }
}
