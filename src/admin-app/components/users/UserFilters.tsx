import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux-store/reduxStore";
import { addSearch } from "../../../redux-store/userParamReducer";

// type T_Dictionary = { [name: string]: string };

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

const UserFilters = () => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   let getSearch: any;
   const [field, setField] = useState("Email");
   const [searchBy, setSearchBy] = useState<T_SearchObject>();
   const dispatch = useAppDispatch();

   const onChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
      if (field == "Email") {
         setSearchBy({
            ...searchBy,
            Email: e.target.value,
            FullName: undefined,
         });
      } else {
         setSearchBy({
            ...searchBy,
            FullName: e.target.value,
            Email: undefined,
         });
      }
   };

   useEffect(() => {
      clearTimeout(getSearch);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      getSearch = setTimeout(() => {
         if (searchBy) dispatch(addSearch(searchBy));
      }, 1000);
      return () => clearTimeout(getSearch);
   }, [searchBy]);

   return (
      <div>
         <div className="container">
            <div className="row">
               <div className="col-md-2 form-group">
                  <div className="col-md-form-label">Search by</div>
                  <select
                     className="form-select"
                     onChange={(e) => setField(e.target.value)}
                  >
                     <option value="Email">Email</option>
                     <option value="FullName">FullName</option>
                  </select>
               </div>

               <div className="col-md-3 form-group">
                  <label className="col-md-form-label">Search</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={onChangeSearchString}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserFilters;
