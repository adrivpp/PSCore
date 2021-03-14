interface Config {
    mongo: {
        uri: string
    },
    auth0: {
        domain: string,
        identifier: string
    }
}

export const config: Config = {
    mongo: {
        uri: process.env.MONGODB_URL ?? "mongodb://localhost:27017/pizza-store"
    },
    auth0: {
        domain: process.env.AUTH0_DOMAIN ?? "",
        identifier: process.env.API_IDENTIFIER ?? ""
    }
}