"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const categories = [
    { name: "Programming", description: "Learn coding and software development" },
    { name: "Mathematics", description: "Mathematics tutoring from basics to advanced" },
    { name: "Languages", description: "Learn new languages with expert tutors" },
    { name: "Science", description: "Physics, Chemistry, Biology tutoring" },
    { name: "Business", description: "Business, Economics, and Finance" },
    { name: "Arts", description: "Music, Drawing, and Creative Arts" },
];
async function seedCategories() {
    try {
        console.log("🌱 Seeding categories started...");
        for (const category of categories) {
            await prisma_1.prisma.category.upsert({
                where: { name: category.name },
                update: {},
                create: category,
            });
            console.log(`✅ Category created: ${category.name}`);
        }
        console.log("🎉 Categories seeded successfully!");
    }
    catch (error) {
        console.error("❌ Error seeding categories:", error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
seedCategories();
//# sourceMappingURL=seedCategories.js.map