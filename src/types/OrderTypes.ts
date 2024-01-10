import { T_CartVm } from "./ShoppingCartTypes";

export type T_DeliveryInformationVm = {
   existingShippingAddresses: T_ShippingAddressVm[];
   shippingAddressId: number;
   billingAddressId: number;
   shippingMethod: string;
   newAddressForm: T_AddressFormVm;
   useShippingAddressAsBillingAddress: boolean;
   newBillingAddressForm: T_AddressFormVm;
   orderNote: string;
};

export type T_ShippingAddressVm = {
   userAddressId: number;
   contactName: string;
   phone: string;
   addressLine1: string;
   addressLine2: string;
   districtId?: number;
   districtName: string;
   zipCode: string;
   stateOrProvinceId: number;
   stateOrProvinceName: string;
   cityName: string;
   countryId: string;
   countryName: string;
   isDistrictEnabled: boolean;
   isZipCodeEnabled: boolean;
   isCityEnabled: boolean;
};

export type T_AddressFormVm = {
   contactName: string;
   phone: string;
   addressLine1: string;
   addressLine2: string;
   stateOrProvinceId: number;
   districtId?: number;
   countryId: string;
   city: string;
   zipCode: string;
   stateOrProvinces: T_SelectListItem[];
   districts: T_SelectListItem[];
   shippableCountries: T_SelectListItem[];
};

export type T_SelectListItem = {
   text: string;
   value: string;
};

export type T_TaxAndShippingPriceRequestVm = {
   selectedShippingMethodName?: string;
   newShippingAddress?: T_ShippingAddressVm;
   newBillingAddress?: T_ShippingAddressVm;
   existingShippingAddressId: number;
};

export type T_OrderTaxAndShippingPriceVm = {
   isProductPriceIncludeTax?: boolean;
   shippingPrices: T_ShippingPrice[];
   selectedShippingMethodName: string;
   cart: T_CartVm;
   shippingAddressId?: number;
};

export type T_ShippingPrice = {
   name: string;
   price: number;
   description: string;
   priceText: string;
};

export type T_OrderDetailVm = {
   id: number;
   customerId: number;
   customerName: string;
   customerEmail: string;
   createdOn: Date;
   orderStatusString: string;
   orderStatus: number;
   subTotal: number;
   discountAmount: number;
   subTotaWithDiscount: number;
   taxAmount: number;
   shippingAmount: number;
   orderTotal: number;
   shippingMethod: string;
   paymentMethod: string;
   paymentFeeAmount: number;
   subTotalString: string;
   discountAmountString: string;
   subtotalWithDiscountString: string;
   taxAmountString: string;
   shippingAmountString: string;
   paymentFeeAmountString: string;
   orderTotalString: string;
   shippingAddress: T_ShippingAddressVm;
   orderItems: T_OrderItemVm[];
   subOrderIds: number[];
   isMasterOrder: boolean;
   orderNote: string;
};

export type T_OrderItemVm = {
   id: number;
   productId: number;
   productName: string;
   productImage: string;
   productPrice: number;
   quantity: number;
   shippedQuantity: number;
   taxAmount: number;
   taxPercent: number;
   discountAmount: number;
   total: number;
   taxIncludedAmount: number;
   rowTotal: number;
   taxAmountString: string;
   productPriceString: string;
   discountAmountString: string;
   totalString: string;
   taxIncludeAmountString: string;
   rowTotalString: string;
   variationOptions: T_ProductVariationOptionVm[];
};

export type T_ProductVariationOptionVm = {
   optionName: string;
   value: string;
};
