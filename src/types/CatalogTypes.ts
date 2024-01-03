export type T_ProductWidgetComponentVm = {
   id: number;
   widgetName: string;
   setting: T_ProductWidgetSetting;
   products: T_ProductThumbnail[];
};

export type T_ProductWidgetSetting = {
   numberOfProducts: number;
   categoryId?: number;
   orderBy: "Newest" | "BestSelling" | "Discount";
   featuredOnly: boolean;
};

export type T_ProductThumbnail = {
   id: number;
   name: string;
   slug: string;
   price: number;
   oldPrice?: number;
   specialPrice?: number;
   isCallForPricing: boolean;
   isAllowToOrder: boolean;
   stockQuantity?: number;
   specialPriceStart: Date;
   specialPriceEnd: Date;
   thumbnailImage: T_Media;
   thumbnailUrl: string;
   reviewsCount: number;
   ratingAverage?: number;
   calculatedProductPrice: T_CalculatedProductPrice;
};

export type T_Media = {
   caption: string;
   fileSize: number;
   fileName: string;
   mediaType: "Image" | "File" | "Video";
};

export type T_CalculatedProductPrice = {
   price: number;
   oldPrice?: number;
   percentOfSaving: number;
   priceString: string;
   oldPriceString: string;
};

export type T_ProductDetail = {
   id: number;
   name: string;
   shortDescription: string;
   metaTitle: string;
   metaKeywords: string;
   metaDescription: string;
   calculatedProductPrice: T_CalculatedProductPrice;
   description: string;
   specification: string;
   isCallForPricing: boolean;
   isAllowToOrder: boolean;
   stockTrackingIsEnabled: boolean;
   stockQuantity: number;
   reviewsCount: number;
   ratingAverage?: number;
   hasVariation: boolean;
   availableOptions: T_ProductDetailOption[];
   optionDisplayValues: T_ProductOptionDisplayDict[];
   images: T_MediaViewModel[];
   variations: T_ProductDetailVariation[];
   attributes: T_ProductDetailAttribute[];
   categories: T_ProductDetailCategory[];
   relatedProducts: T_ProductThumbnail[];
   crossSellProducts: T_ProductThumbnail[];
   brand: T_Brand;
};

export type T_ProductDetailOption = {
   optionId: number;
   optionName: string;
   values: string[];
};

export type T_ProductOptionDisplay = {
   value: string;
   displayType: string;
};

type T_ProductOptionDisplayDict = {
   key: string;
   value: T_ProductOptionDisplay;
};

export type T_MediaViewModel = {
   url: string;
   thumbnailUrl: string;
};

export type T_ProductDetailVariation = {
   id: number;
   name: string;
   normalizedName: string;
   isCallForPricing: boolean;
   isAllowToOrder: boolean;
   stockQuantity: number;
   stockTrackingIsEnabled: boolean;
   calculatedProductPrice: T_CalculatedProductPrice;
   images: T_MediaViewModel[];
   options: T_ProductDetailVariationOption[];
};

export type T_ProductDetailVariationOption = {
   optionId: number;
   optionName: string;
   value: string;
};

export type T_ProductDetailAttribute = {
   name: string;
   value: string;
};

export type T_ProductDetailCategory = {
   id: number;
   name: string;
   slug: string;
};

export type T_Brand = {
   name: string;
   slug: string;
   description: string;
   isPublished: boolean;
   isDeleted: boolean;
};
