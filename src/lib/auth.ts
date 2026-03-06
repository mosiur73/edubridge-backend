import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ✅ CRITICAL: Allow both origins
  trustedOrigins: [
    "http://localhost:3000",
    "https://edubridge-client.vercel.app",
  ],

  // ✅ Base URL for backend
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",

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
      maxAge: 60 * 60 * 24 * 7, // 7 days
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

