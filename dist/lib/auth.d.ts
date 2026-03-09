export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
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
    session: {
        cookieCache: {
            enabled: true;
            maxAge: number;
        };
    };
    advanced: {
        defaultCookieAttributes: {
            secure: true;
            httpOnly: true;
            sameSite: "none";
            partitioned: true;
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map