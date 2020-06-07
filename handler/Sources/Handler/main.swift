import AWSLambdaRuntime

struct Input: Codable {
    let name: String
}

struct Output: Codable {
    let greeting: String
}

func main() {
    Lambda.run { (context, input: Input, callback) in
        callback(.success(Output(greeting: "Hello \(input.name)")))
    }
}

#if DEBUG
    try Lambda.withLocalServer {
        main()
    }
#else
    main()
#endif
