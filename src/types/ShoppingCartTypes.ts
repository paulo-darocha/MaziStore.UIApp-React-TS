export type T_AddToCartModel = {
   productId: number;
   variationName?: string;
   quantity: number;
};

export type T_AddToCartResultVm = {
   productName: string;
   productImage: string;
   productPrice: number;
   variationName: string;
   quantity: number;
   cartItemCount: number;
   cartAmount: number;
   productPriceString: string;
   cartAmountString: string;
};

export type T_CartVm = {
   id: number;
   lockedOnCheckout: boolean;
   couponCode: string;
   subTotal: number;
   subTotalString: string;
   discount: number;
   discountString: string;
   couponValidationErrorMessage: string;
   isProductPriceIncludeTax: boolean;
   taxAmount?: number;
   orderNote: string;
   taxAmountString: string;
   shippingAmount?: number;
   shippingAmountString: string;
   subTotalWithDiscount: number;
   subTotalWithDiscountWithoutTax: number;
   orderTotal: number;
   orderTotalString: string;
   items: T_CartItemVm[];
   isValid: boolean;
};

export type T_CartItemVm = {
   id: number;
   productId: number;
   productName: string;
   productImage: string;
   productPrice: number;
   productPriceString: string;
   productStockQuantity: number;
   productStockTrackingIsEnabled: boolean;
   isProductAvailabeToOrder: boolean;
   quantity: number;
   total: number;
   totalString: string;
   variationOptions: T_ProductVariationOption[];
};

export type T_ProductVariationOption = {
   optionName: string;
   value: string;
};

export type T_CartQuantityUpdate = {
   cartItemId: number;
   quantity?: number;
};
