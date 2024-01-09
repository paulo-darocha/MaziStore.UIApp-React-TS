import { FC, useEffect, useState } from "react";
import { T_OrderTaxAndShippingPriceVm } from "../../types/OrderTypes";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../webApis/CoreWebApi";

type T_Props = { shippingData: T_OrderTaxAndShippingPriceVm };

const OrderSummary: FC<T_Props> = ({ shippingData }) => {
   const [dev, setDev] = useState(false);
   const [images, setImages] = useState<Blob[] | undefined>();
   const navigate = useNavigate();

   useEffect(() => {
      const getCartImages = async () => {
         const imagesPromise = shippingData.cart.items.map((item) =>
            getImage(item.productImage).then((res) => res)
         );
         return await Promise.all(imagesPromise);
      };

      if (shippingData && shippingData.cart) {
         getCartImages().then((res) => setImages(res));
      }
   }, [shippingData]);

   return (
      <div className="text-center">
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [OrderSummary - JSON]
         </div>
         <div className="h4">OrderSummary</div>
         <div>
            <div className="p-4">
               <table className="table">
                  <thead>
                     <tr>
                        <th colSpan={2}>Product</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Price</th>
                     </tr>
                  </thead>
                  <tbody>
                     {shippingData.cart.items.map((item, i) => (
                        <tr key={item.id}>
                           <td>
                              {images && (
                                 <img
                                    src={URL.createObjectURL(images[i])}
                                    style={{ maxWidth: "12vh" }}
                                 />
                              )}
                           </td>
                           <td className="text-start">
                              <span
                                 className="btn btn-default btn-sm "
                                 onClick={() => navigate(`product/${item.id}`)}
                              >
                                 <span className="h6">{item.productName}</span>
                              </span>
                              {item.variationOptions && (
                                 <ul
                                    style={{
                                       listStyle: "none",
                                       marginLeft: "-15px",
                                       fontSize: ".8em",
                                    }}
                                 >
                                    {item.variationOptions.map((attr) => (
                                       <li key={attr.value}>
                                          {attr.optionName}: {attr.value}
                                       </li>
                                    ))}
                                 </ul>
                              )}
                           </td>
                           <td className="text-center">{item.quantity}</td>
                           <td className="text-end">
                              {item.productPriceString}
                           </td>
                        </tr>
                     ))}
                     <tr style={{ fontWeight: "bold" }}>
                        <td />
                        <td>Subtotal</td>
                        <td colSpan={2} className="text-end">
                           {shippingData.cart.subTotalString}
                        </td>
                     </tr>
                     <tr style={{ fontWeight: "bold" }}>
                        <td />
                        <td>Shipping</td>
                        <td colSpan={2} className="text-end">
                           {shippingData.cart.shippingAmountString}
                        </td>
                     </tr>
                     {!shippingData.cart.isProductPriceIncludeTax && (
                        <tr style={{ fontWeight: "bold" }}>
                           <td />
                           <td>Tax</td>
                           <td colSpan={2} className="text-end">
                              {shippingData.cart.taxAmountString}
                           </td>
                        </tr>
                     )}
                     <tr style={{ fontWeight: "bold" }}>
                        <td />
                        <td>Discount</td>
                        <td colSpan={2} className="text-end">
                           {shippingData.cart.discountString}
                        </td>
                     </tr>
                     <tr style={{ fontWeight: "bold" }}>
                        <td />
                        <td>
                           Total{" "}
                           {shippingData.cart.isProductPriceIncludeTax &&
                              "(VAT included)"}
                        </td>
                        <td colSpan={2} className="text-end">
                           {shippingData.cart.orderTotalString}
                        </td>
                     </tr>
                     <tr>
                        <td />
                        <td colSpan={3}>
                           <strong>Note: </strong>
                           <p>{shippingData.cart.orderNote}</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Checkout.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(shippingData, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default OrderSummary;
