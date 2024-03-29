import { T_SelectListItem } from "./OrderTypes";

export type OneResponse<T> = {
   error: boolean;
   msg: string;
   res?: T;
};

export type ArrayResponse<T> = {
   error: boolean;
   msg: string;
   res?: T[];
};

export type T_WidgetInstanceViewModel = {
   id: number;
   name: string;
   viewComponentName: string;
   widgetZoneId: number;
   data: string; //json
   htmlData: string; //json
   widgetId: string;
};

export type T_HomeViewModel = {
   widgetInstances: T_WidgetInstanceViewModel[];
};

export type T_UserAddressFormViewModel = {
   id: number;
   contactName: string;
   phone: string;
   addressLine1: string;
   addressLine2: string;
   zipCode: string;
   city: string;
   stateOrProvinceId: number;
   districtId?: number;
   countryId: string;
   stateOrProvinces: T_SelectListItem[];
   districts: T_SelectListItem[];
   countries: T_SelectListItem[];
   displayDistrict: boolean;
   displayZipCode: boolean;
   displayCity: boolean;
};

export type T_UserAddressListItem = {
   addressId: number;
   userAddressId: number;
   contactName: string;
   phone: string;
   addressLine1: string;
   addressLine2: string;
   districtName: string;
   stateOrProvinceName: string;
   countryName: string;
   isDefaultShippingAddress: boolean;
   displayDistrict: boolean;
   displayZipCode: boolean;
   displayCity: boolean;
   cityName: string
};

export type T_UserResult = {
   id: number
   succeeded: boolean
   message: string
   token: string
   fullName: string
   email: string
   imageUrl?: string
}