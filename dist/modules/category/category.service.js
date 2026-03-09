"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllCategories = async () => {
    return await prisma_1.prisma.category.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};
exports.categoryService = {
    getAllCategories,
};
