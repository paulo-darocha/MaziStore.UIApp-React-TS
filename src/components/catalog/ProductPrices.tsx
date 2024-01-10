import { FC, useState } from "react";
import {
   T_ProductDetail,
   T_ProductDetailVariation,
} from "../../types/CatalogTypes";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductCartModal from "./ProductCartModal";
import {
   getCartItemsCount,
   sendCartToServer,
} from "../../webApis/ShoppingCartWebApi";
import {
   T_AddToCartModel,
   T_AddToCartResultVm,
} from "../../types/ShoppingCartTypes";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { setItemsCount } from "../../redux-store/cartItemsReducer";

type T_Props = {
   product: T_ProductDetailVariation | T_ProductDetail;
   pending: boolean;
};

const ProductPrices: FC<T_Props> = ({ product, pending }) => {
   const [show, setShow] = useState(false);
   const [quantity, setQuantity] = useState(1);
   const [message, setMessage] = useState("");
   const [modalData, setModalData] = useState<T_AddToCartResultVm | null>(null);
   const [dev, setDev] = useState(false);

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onAlterQuantity = (action: "add" | "subtract") => {
      if (action == "add") {
         if (product.stockQuantity > quantity) {
            setQuantity(quantity + 1);
         } else {
            setMessage(
               `We have only ${product.stockQuantity} pieces in stock.`
            );
         }
      } else {
         if (quantity > 1) {
            setQuantity(quantity - 1);
         }
      }
   };

   const onClickAddToCart = () => {
      const data: T_AddToCartModel = {
         productId: product.id,
         quantity: quantity,
      };
      if (pending) {
         setMessage("Please choose all options");
      } else {
         sendCartToServer(data).then((res) => {
            setModalData(res);
            getCartItemsCount().then((res) => dispatch(setItemsCount(res)));
         });

         setShow(true);
      }
   };

   

   const onCloseModal = () => {
      () => setShow(false);
      navigate("/");
   };

   return (
      <div>
         <hr />
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: ProductDetailPricing.tsx [JSON]
         </div>
         <div className="mt-3">
            {product.isCallForPricing ? (
               <span className="h6">Call us for pricing</span>
            ) : (
               <>
                  <span className="h5">
                     {product.calculatedProductPrice.priceString}
                  </span>
                  <span>
                     {product.calculatedProductPrice.percentOfSaving > 0 && (
                        <>
                           <span
                              className="h6 mx-4 text-danger"
                              style={{ textDecoration: "line-through" }}
                           >
                              {product.calculatedProductPrice.oldPrice}
                           </span>
                           <span
                              style={{
                                 border: "1px solid green",
                                 padding: "6px",
                              }}
                           >
                              <strong className="text-success">
                                 You save{" "}
                                 {
                                    product.calculatedProductPrice
                                       .percentOfSaving
                                 }
                                 %
                              </strong>
                           </span>
                        </>
                     )}
                  </span>
                  {product.stockTrackingIsEnabled &&
                     product.stockQuantity <= 0 && (
                        <div className="text-danger h6 my-2">out of stock</div>
                     )}
                  <div className="d-grid mt-3">
                     <span className="h6">quantity:</span>
                     <ButtonGroup style={{ maxWidth: "150px" }}>
                        <Button
                           variant="outline-dark"
                           onClick={() => onAlterQuantity("subtract")}
                        >
                           -
                        </Button>
                        <Button variant="outline-dark">{quantity}</Button>
                        <Button
                           onBlur={() => setMessage("")}
                           variant="outline-dark"
                           onClick={() => onAlterQuantity("add")}
                        >
                           +
                        </Button>
                     </ButtonGroup>
                     <div className="my-2 text-danger">{message}</div>
                  </div>
               </>
            )}
         </div>
         <div>
            {!product.isAllowToOrder ||
            (product.stockTrackingIsEnabled &&
               product.stockQuantity <= 0) ? null : (
               <div
                  className="my-2"
                  onClick={onClickAddToCart}
                  onBlur={() => setMessage("")}
               >
                  <Button>Add to Cart</Button>
               </div>
            )}
            <div className="my-3"></div>
            <Link to="">Add To Wishlist</Link> |{" "}
            <Link to="">Add To Compare</Link>
         </div>

         <Modal show={show} size="lg" onHide={onCloseModal}>
            {modalData && <ProductCartModal item={modalData} />}
         </Modal>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetailPricing.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(product, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductPrices;
