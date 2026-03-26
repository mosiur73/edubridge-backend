export declare const categoryService: {
    getAllCategories: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map