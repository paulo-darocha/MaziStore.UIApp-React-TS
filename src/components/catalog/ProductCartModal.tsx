import { FC, useEffect, useState } from "react";
import { T_AddToCartResultVm } from "../../types/ShoppingCartTypes";
import { Button, Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import { useNavigate } from "react-router-dom";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { useAppSelector } from "../../redux-store/reduxStore";

type T_Props = { item: T_AddToCartResultVm };

const ProductCartModal: FC<T_Props> = ({ item }) => {
   const [count, setCount] = useState(0);
   const [image, setImage] = useState<Blob | null>(null);
   const navigate = useNavigate();
   const id = useAppSelector((x) => x.id);

   useEffect(() => {
      getImage(item.productImage).then((res) => setImage(res));
      getCartItemsCount(id).then((res) => setCount(res));
   }, [item]);

   return (
      <>
         <Modal.Header closeButton>
            <Modal.Title>The product has been added to your cart</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="row">
               <div className="col-4">
                  {image && (
                     <img src={URL.createObjectURL(image)} className="w-100" />
                  )}
               </div>
               <div className="col-8">
                  <div className="h3">{item.productName}</div>
                  <div className="h6 py-2">
                     {item.quantity} x {item.productPrice}
                  </div>
                  <div className="h6 py-2">
                     Cart Subtotal: {item.cartAmountString}
                  </div>
               </div>
            </div>
            <div className="float-end me-3 h6">
               You have {count} item{count > 1 && "s"} in your cart
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="success" onClick={() => navigate("/")}>
               Continue Shopping
            </Button>
            <span className="mx-2"></span>
            <Button variant="success" onClick={() => navigate("/cart")}>
               View Cart
            </Button>
         </Modal.Footer>
      </>
   );
};

export default ProductCartModal;
