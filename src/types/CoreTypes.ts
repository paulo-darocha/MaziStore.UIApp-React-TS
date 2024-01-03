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
