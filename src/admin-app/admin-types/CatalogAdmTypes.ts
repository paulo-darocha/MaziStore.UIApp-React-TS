export type T_ProductResult = {
   items: T_ProductListItem[];
   totalRecord: number;
   numberOfPages: number;
};

export type T_ProductListItem = {
   id: number;
   name: string;
   hasOptions: boolean;
   isVisibleIndividually: boolean;
   createdOn: Date;
   isPublished: boolean;
   isFeatured: boolean;
   isCallForPricing: boolean;
   isAllowToOrder: boolean;
   stockQuantity?: number;
};

export type T_ProductVm = {
   id: number;
   price: number;
   oldPrice?: number;
   specialPrice?: number;
   specialPriceStart?: Date;
   specialPriceEnd?: Date;
   isCallForPricing: boolean;
   isAllowToOrder: boolean;
   name: string;
   slug: string;
   metaTitle: string;
   metaKeywords: string;
   metaDescription: string;
   sku: string;
   gtin: string;
   shortDescription: string;
   description: string;
   specification: string;
   isPublished: boolean;
   isFeatured: boolean;
   stockTrackingIsEnabled: boolean;
   categoryIds: number[];
   attributes: T_ProductAttributeVm[];
   options: T_ProductOptionVm[];
   variations: T_ProductVariationVm[];
   thumbnailImageUrl: string;
   productImages: T_ProductMediaVm[];
   productDocuments: T_ProductMediaVm[];
   deletedMediaIds: number[];
   brandId?: number;
   taxClassId: number;
   relatedProducts: T_ProductLinkVm[];
   crossSellProducts: T_ProductLinkVm[];
};

export type T_ProductAttributeVm = {
   id: number;
   attributeValueId: number;
   name: string;
   value: string;
   groupName: string;
};

export type T_ProductOptionVm = {
   id: number;
   name: string;
   displayType: string;
   values: T_ProductOptionValueVm[];
};

export type T_ProductOptionValueVm = {
   key: string;
   display: string;
};

export type T_ProductVariationVm = {
   id: number;
   name: string;
   normalizedName: string;
   sku: string;
   gtin: string;
   price: number;
   oldPrice?: number;
   thumbnailImage: string;
   thumbnailImageUrl: string;
   newImages: object;
   imageUrls: string[];
   optionCombinations: T_ProductOptionCombinationVm[];
};

export type T_ProductOptionCombinationVm = {
   optionId: number;
   optionName: string;
   value: string;
   sortIndex: number;
};

export type T_ProductMediaVm = {
   id: number;
   caption: string;
   mediaUrl: string;
};

export type T_ProductLinkVm = {
   id: number;
   name: string;
   isPublished: boolean;
};

export type T_ProductForm = {
   product: T_ProductVm;
   thumbnailImage?: Blob;
   productImages?: Blob[];
   productDocuments?: File[];
};

export type T_ProductOption = { id: number; name: string };
