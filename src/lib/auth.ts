import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ✅ Base URL
  baseURL: process.env.BETTER_AUTH_URL || "https://edubridge-backend-ruddy.vercel.app",

  // ✅ Trusted origins - CRITICAL!
  trustedOrigins: [
    "http://localhost:3000",
    "https://edubridge-client.vercel.app",
    "https://edubridge-client-git-main-mosiurs-projects-799abad9.vercel.app",
  ],

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

  // ✅ CRITICAL: Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update every day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
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

