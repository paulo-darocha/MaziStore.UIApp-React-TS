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
