"use strict";
// import app from "./app";
// import { prisma } from "./lib/prisma";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./lib/prisma");
const PORT = Number(process.env.PORT) || 5000; // ✅ Convert to number
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log("✅ Connected to the database successfully.");
        app_1.default.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error("❌ An error occurred:", error);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map