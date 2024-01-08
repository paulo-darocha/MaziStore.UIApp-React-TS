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
