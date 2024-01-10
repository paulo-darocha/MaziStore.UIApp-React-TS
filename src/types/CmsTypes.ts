export type T_CarouselWidgetVm = {
   id: number;
   dataInterval: number;
   items: T_CarouselWidgetItemVm[];
};

export type T_CarouselWidgetItemVm = {
   image: string;
   caption: string;
   subCaption: string;
   linkText: string;
   targetUrl: string;
};
