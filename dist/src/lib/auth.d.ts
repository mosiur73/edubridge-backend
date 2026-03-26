export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    baseURL: string | undefined;
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                required: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
    };
    socialProviders: {
        google: {
            accessType: "offline";
            prompt: "select_account consent";
            clientId: string;
            clientSecret: string;
        };
    };
    advanced: {
        cookies: {
            session_token: {
                name: string;
                attributes: {
                    httpOnly: true;
                    secure: true;
                    sameSite: "none";
                    partitioned: true;
                };
            };
            state: {
                name: string;
                attributes: {
                    httpOnly: true;
                    secure: true;
                    sameSite: "none";
                    partitioned: true;
                };
            };
        };
    };
    plugins: [{
        id: "oauth-proxy";
        options: NoInfer<import("better-auth/plugins").OAuthProxyOptions>;
        endpoints: {
            oAuthProxy: import("better-auth").StrictEndpoint<"/oauth-proxy-callback", {
                method: "GET";
                operationId: string;
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                    cookies: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        parameters: {
                            in: "query";
                            name: string;
                            required: true;
                            description: string;
                        }[];
                        responses: {
                            302: {
                                description: string;
                                headers: {
                                    Location: {
                                        description: string;
                                        schema: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, never>;
        };
        hooks: {
            before: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>;
            }[];
            after: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>;
            }[];
        };
    }];
}>;
//# sourceMappingURL=auth.d.ts.map