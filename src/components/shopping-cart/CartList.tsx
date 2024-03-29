import { useEffect, useState } from "react";
import {
   getCartDetails,
   getCartItemsCount,
   removeItemFromCart,
   updateCartQuantity,
} from "../../webApis/ShoppingCartWebApi";
import { T_CartQuantityUpdate, T_CartVm } from "../../types/ShoppingCartTypes";
import CartProductsTable from "./CartProductsTable";
import CartSummary from "./CartSummary";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { setItemsCount } from "../../redux-store/cartItemsReducer";
import { useNavigate } from "react-router-dom";

export type T_Update = "add" | "sub" | "del";

const CartList = () => {
   const [dev, setDev] = useState(false);
   const [cart, setCart] = useState<T_CartVm | null>(null);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const id = useAppSelector((x) => x.id);
   const count = useAppSelector((x) => x.items);

   useEffect(() => {
      getCartDetails(id).then((res) => setCart(res));
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

   useEffect(() => {
      getCartItemsCount(id).then((res) => dispatch(setItemsCount(res)));
   }, [cart, dispatch]);

   return (
      <>
         {count && count > 0 ? (
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
         ) : (
            <div className="text-center m-5">
               <div className="h5 m-5">
                  You don't have any items in your cart yet.
               </div>
               <Button onClick={() => navigate("/")}>Go Shopping</Button>
            </div>
         )}
      </>
   );
};

export default CartList;
