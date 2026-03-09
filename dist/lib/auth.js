"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const prisma_2 = require("./prisma");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [
        "http://localhost:3000",
        "https://edubridge-client.vercel.app",
        process.env.APP_URL || "https://edubridge-client.vercel.app",
    ].filter(Boolean),
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "STUDENT",
                required: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            accessType: "offline",
            prompt: "select_account consent",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7,
        },
    },
    advanced: {
        defaultCookieAttributes: {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            partitioned: true,
        },
    },
});
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";
// // If your Prisma file is located elsewhere, you can change the path
// export const auth = betterAuth({
//     database: prismaAdapter(prisma, {
//         provider: "postgresql",
//     }),
//      trustedOrigins:[process.env.APP_URL!],
//     user:{
//       additionalFields:{
//         role:{
//           type:"string",
//           defaultValue: "STUDENT",
//           required:false
//         }
//       }
//     },
//       emailAndPassword: { 
//     enabled: true, 
//   }, 
//    socialProviders: {
//         google: { 
//             accessType:"offline",  
//             prompt:"select_account consent",
//             clientId: process.env.GOOGLE_CLIENT_ID as string, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
//         }, 
//     },
// });
//# sourceMappingURL=auth.js.map