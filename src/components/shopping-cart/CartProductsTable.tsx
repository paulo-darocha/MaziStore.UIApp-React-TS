import { FC } from "react";
import { T_CartItemVm } from "../../types/ShoppingCartTypes";
import CartTableLine from "./CartTableLine";
import { T_Update } from "./CartList";

type T_Props = {
   items: T_CartItemVm[];
   update: (id: number, qtde: number, action: T_Update) => void;
};

const CartProductsTable: FC<T_Props> = ({ items, update }) => {
   return (
      <div>
         CartProductsTable
         <div>
            <table className="table table-sm">
               <thead>
                  <tr>
                     <th colSpan={2}>Product</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody >
                  {items &&
                     items.map((item: T_CartItemVm) => (
                        <CartTableLine
                           item={item}
                           key={item.id}
                           update={update}
                        />
                     ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default CartProductsTable;
