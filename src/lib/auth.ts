import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://edubridge-client.vercel.app",
    process.env.APP_URL || "https://edubridge-client.vercel.app",
  ].filter(Boolean) as string[],

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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  // ✅ SameSite=None — cross-origin cookie allow করবে
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

