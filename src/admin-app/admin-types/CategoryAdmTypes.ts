export type T_CategoryListItem = {
   id: number;
   name: string;
   displayOrder: number;
   includeInMenu: boolean;
   isPublished: boolean;
   parentId?: number;
};

export type T_CategoryForm = {
   id: number;
   slug: string;
   name: string;
   description: string;
   metaTitle: string;
   metaKeywords: string;
   metaDescription: string;
   displayOrder: number;
   parentId?: number;
   includeInMenu: boolean;
   isPublished: boolean;
   thumbnailImage?: Blob;
   thumbnailImageUrl?: string;
};

export type T_ProductInCategory = {
   id: number;
   productName: string;
   isFeaturedProduct: boolean;
   displayOrder: number;
   isProductPublished: boolean;
};
