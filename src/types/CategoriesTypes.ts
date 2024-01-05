import { T_ProductThumbnail } from "./CatalogTypes";

export type T_CategoryMenuItem = {
   id: number;
   name: string;
   slug: string;
   parent: T_CategoryMenuItem;
   childItems: T_CategoryMenuItem[];
};

export type T_SearchOption = {
   query?: string;
   brand?: string;
   category?: string;
   page?: number;
   pageSize?: number;
   sort?: string;
   minPrice?: number;
   maxPrice?: number;
};

export type T_ProductsByCategory = {
   categoryId: number;
   parentCategoryId?: number;
   categoryName: string;
   categorySlug: string;
   categoryMetaTitle: string;
   categoryMetaKeywords: string;
   categoryMetaDescription: string;
   totalProduct: number;
   products: T_ProductThumbnail[];
   filterOption: T_FilterOption;
   currentSearchOption: T_SearchOption;
   availableSortOptions: T_SelectListItem[];
};

export type T_FilterOption = {
   brands: T_FilterBrand[];
   categories: T_FilterCategory[];
   price: T_FilterPrice;
};

export type T_SelectListItem = {
   text: string;
   value: string;
};

export type T_FilterBrand = {
   id: number;
   name: string;
   slug: string;
   count: number;
};

export type T_FilterCategory = {
   id: number;
   name: string;
   slug: string;
   count: number;
   parentId: number;
};

export type T_FilterPrice = {
   maxPrice: number;
   minPrice: number;
};
