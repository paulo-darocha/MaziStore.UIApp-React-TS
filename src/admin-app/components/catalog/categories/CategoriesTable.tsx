import { FC } from "react";
import { T_CategoryListItem } from "../../../admin-types/CategoryAdmTypes";
import CategoryRow from "./CategoryRows";

type T_Props = { categories: T_CategoryListItem[] };

const CategoriesTable: FC<T_Props> = ({ categories }) => {
   return (
      <div>
         <div>CategoriesTable</div>
         <table className="table table-sm table-bordered text-center">
            <thead>
               <tr>
                  <th className="text-start align-baseline">Name</th>
                  <th>Include in menu</th>
                  <th>Display Order</th>
                  <th>Is Published</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {categories &&
                  categories.map((category) => (
                     <CategoryRow category={category} key={category.id} />
                  ))}
            </tbody>
         </table>
      </div>
   );
};

export default CategoriesTable;
