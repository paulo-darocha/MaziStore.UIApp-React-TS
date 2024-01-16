export type T_LoginViewModel = {
   email: string;
   password: string;
   rememberMe: boolean;
};

export type T_RegisterViewModel = {
   email: string;
   fullName: string;
   password: string;
   confirmPassword: string;
   callbackUrl?: string;
};

export type T_OrderHistoryListItem = {
   id: number;
   createdOn: Date;
   subTotal: number;
   subTotalString: string;
   orderStatus: T_OrderStatus;
   orderItems: T_OrderHistoryProductVm[];
};

export type T_OrderHistoryProductVm = {
   productId: number;
   productName: string;
   productOptions: string[];
   productOptionString: string;
   quantity: number;
   thumbnailImage: string;
};

export type T_OrderStatus =
   | "New"
   | "OnHold"
   | "PendingPayment"
   | "PaymentReceived"
   | "PaymentFailed"
   | "Invoiced"
   | "Shipping"
   | "Shipped"
   | "Complete"
   | "Canceled"
   | "Refunded"
   | "Closed";

export type T_PublicCommentVm = {
   comment: string;
   title: string;
   name: string;
   email: string;
};
