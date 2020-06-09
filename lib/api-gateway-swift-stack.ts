import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import { Builder } from "./builder";

export class ApiGatewaySwiftStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const code = new Builder({
      dir: path.join(__dirname, "../handler"),
      executable: "Handler",
    }).build();

    new lambda.Function(this, "Handler", {
      code,
      handler: "Handler",
      runtime: lambda.Runtime.PROVIDED,
    });
  }
}
