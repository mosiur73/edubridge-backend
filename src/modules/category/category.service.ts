import { prisma } from "../../lib/prisma";

const getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const categoryService = {
  getAllCategories,
};