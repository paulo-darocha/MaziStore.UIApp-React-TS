export type T_CheckoutPaymentForm = {
   paymentProviders: T_PaymentProviderVm[];
};

export type T_PaymentProviderVm = {
   id: string;
   name: string;
   landingViewComponentName: string;
};
