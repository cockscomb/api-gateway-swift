import AWSLambdaEvents
import AWSLambdaRuntime
import Foundation

struct Response: Codable {
    let message: String
}

func main() {
    Lambda.run {
        (
        context,
        request: APIGateway.Request,
        callback: @escaping (Result<APIGateway.Response, Error>) -> Void
        ) in
        context.logger.debug("\(request)")
        let encoder = JSONEncoder()
        do {
            let response = Response(message: "OK")
            let json = try encoder.encode(response)
            callback(
                .success(
                    APIGateway.Response(
                        statusCode: .ok,
                        headers: ["Content-Type": "application/json"],
                        body: String(bytes: json, encoding: .utf8)
                    )
                )
            )
        } catch {
            callback(.failure(error))
        }
    }
}

#if DEBUG
try Lambda.withLocalServer {
    main()
}
#else
main()
#endif
