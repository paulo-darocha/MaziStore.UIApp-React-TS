import { FC } from "react";
import { T_ProductListItem } from "../../../admin-types/CatalogAdmTypes";
import ProductRow from "./ProductRow";

type T_Props = { items: T_ProductListItem[] };

const ProductsTable: FC<T_Props> = ({ items }) => {
   return (
      <div>
         <div>ProductsTable</div>
         <table className="table table-bordered text-center">
            <thead>
               <tr>
                  <th className="text-start">Name</th>
                  <th>Has Options</th>
                  <th>Stock Quantity</th>
                  <th>Created On</th>
                  <th></th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {items &&
                  items.map((item) => <ProductRow item={item} key={item.id} />)}
            </tbody>
         </table>
      </div>
   );
};

export default ProductsTable;
