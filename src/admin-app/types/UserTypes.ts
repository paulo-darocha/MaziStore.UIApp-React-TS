export type T_SmartTableParam = {
   pagination: T_Pagination;
   search?: T_Search;
   sort: T_Sort;
};

export type T_Pagination = {
   start: number;
   totalItemCount: number;
   number: number;
   numberOfPages?: number;
};

export type T_Search = {
   predicateObject?: object; // convert to JSON
};

export type T_Sort = {
   predicate?: string; // convert to JSON
   reverse?: boolean;
};

export type T_SmartTableResult<T> = {
   items: T[];
   totalRecord: number;
   numberOfPages: number;
};

export type T_UserResult = {
   id: number;
   email: string;
   fullName: string;
   createdOn: Date;
   roles: string[];
   customerGroups: string[];
};

export type T_SearchObject = {
   Email?: string;
   FullName?: string;
   RoleId?: number;
   CustomerGroupId?: number;
   CreatedOn?: {
      before?: string;
      after?: string;
   };
};
