import * as lambda from "@aws-cdk/aws-lambda";
import { spawnSync, SpawnSyncReturns } from "child_process";
import * as path from "path";

interface Options {
  dir: string;
  executable: string;
}

export class Builder {
  private static imageName: string = "swift-lambda-builder";

  constructor(private readonly options: Options) {}

  private docker(args: string[]): SpawnSyncReturns<string> {
    const returns = spawnSync("docker", args);
    if (returns.error) {
      throw returns.error;
    }
    if (returns.status !== 0) {
      throw new Error(
        `[Status ${
          returns.status
        }] stdout: ${returns.stdout?.toString().trim()}\n\n\nstderr: ${returns.stderr?.toString().trim()}`
      );
    }
    return returns;
  }

  public build(): lambda.AssetCode {
    this.docker(["build", "--tag", Builder.imageName, path.join(__dirname, "../builder")]);
    this.docker(["run", "--rm", "--volume", `${this.options.dir}:/src`, Builder.imageName, this.options.executable]);
    return lambda.Code.fromAsset(
      path.join(this.options.dir, "./.build/lambda/", this.options.executable, "lambda.zip")
    );
  }
}
