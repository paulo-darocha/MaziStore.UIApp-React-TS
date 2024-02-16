import { FC } from "react";
import { T_ProductListItem } from "../../../admin-types/CatalogAdmTypes";
import ProductRowSm from "./ProductRowSm";

type T_Props = { items: T_ProductListItem[] };

const ProductsTableSm: FC<T_Props> = ({ items }) => {
   return (
      <div>
         <div>ProductsTableSm</div>
         <table className="table table-bordered text-center">
            <thead>
               <tr>
                  <th className="text-start">Name</th>
                  <th className="d-none d-sm-block">Stock Quantity</th>
                  <th></th>
                  <th className="d-none d-sm-block">Actions</th>
               </tr>
            </thead>
            <tbody>
               {items &&
                  items.map((item) => (
                     <ProductRowSm item={item} key={item.id} />
                  ))}
            </tbody>
         </table>
      </div>
   );
};

export default ProductsTableSm;
