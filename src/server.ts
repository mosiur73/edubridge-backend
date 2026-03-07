// import app from "./app";
// import { prisma } from "./lib/prisma";

// const PORT = process.env.PORT || 5000;

// async function main() {
//     try {
//         await prisma.$connect();
//         console.log("Connected to the database successfully.");

//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error("An error occurred:", error);
//         await prisma.$disconnect();
//         process.exit(1);
//     }
// }

// main();

import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = Number(process.env.PORT) || 5000;  // ✅ Convert to number

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to the database successfully.");
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();