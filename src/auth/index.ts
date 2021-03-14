const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const authClient = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header: any, callback: any) => {
    authClient.getSigningKey(header.kid, function(error: any, key: any) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

const options = {
    audience: process.env.API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
}

export const getuser = (token?: string) => {
    if (!!token) {
        const bearerToken = token.split(" ")[1];
        return new Promise((resolve, reject) => {
            jwt.verify(bearerToken, getKey, options, (err: any, decoded: any) => {
                if (err) {
                    console.log(err)
                }
                resolve(decoded);
            });
        })
    };
}