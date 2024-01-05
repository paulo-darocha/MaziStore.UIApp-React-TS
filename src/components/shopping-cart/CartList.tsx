import { useEffect, useState } from "react";
import {
   getCartDetails,
   removeItemFromCart,
   updateCartQuantity,
} from "../../webApis/ShoppingCartWebApi";
import { T_CartQuantityUpdate, T_CartVm } from "../../types/ShoppingCartTypes";
import CartProductsTable from "./CartProductsTable";
import CartSummary from "./CartSummary";
import { Modal } from "react-bootstrap";

export type T_Update = "add" | "sub" | "del";

const CartList = () => {
   const [dev, setDev] = useState(false);
   const [cart, setCart] = useState<T_CartVm | null>(null);

   useEffect(() => {
      getCartDetails().then((res) => setCart(res));
   }, []);

   const updateQuantity = (id: number, quantity: number, action: T_Update) => {
      const update = (delta: number) => {
         const data: T_CartQuantityUpdate = {
            cartItemId: id,
            quantity: quantity + delta,
         };
         updateCartQuantity(data).then((res) => setCart(res));
      };

      switch (action) {
         case "add":
            update(+1);
            break;
         case "sub":
            update(-1);
            break;
         case "del": {
            const data: T_CartQuantityUpdate = {
               cartItemId: id,
            };
            removeItemFromCart(data).then((res) => setCart(res));
            break;
         }
         default:
            break;
      }
   };

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [CartList - JSON]
         </div>
         <div className="row">
            <div className="col-md-8">
               {cart && (
                  <CartProductsTable
                     items={cart?.items}
                     update={updateQuantity}
                  />
               )}
            </div>
            <div className="col-md-3">
               {cart && <CartSummary summary={{ ...cart, items: [] }} />}
            </div>
         </div>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Cart.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(cart, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CartList;
