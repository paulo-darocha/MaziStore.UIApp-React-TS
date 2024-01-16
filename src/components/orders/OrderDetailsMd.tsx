import { FC } from "react";
import { T_OrderDetailVm } from "../../types/OrderTypes";

type T_Props = { order?: T_OrderDetailVm, images?: Blob[] };

const OrderDetailsMd: FC<T_Props> = ({ order, images }) => {
   return (
      <div>
         <div className="row">
            <div className="col-md-7">
               <h5>Order Status - {order?.orderStatusString}</h5>
            </div>
            <div className="col-md-5">
               Order data: {new Date(order?.createdOn ?? "").toLocaleString()}
            </div>
         </div>

         <div className="row h5 my-3">
            <div className="col-md-4">
               <strong>Shipping Address</strong>
            </div>
            <div className="col-md-4">
               <strong>Shipping Method</strong>
            </div>
            <div className="col-md-4">
               <strong>Payment Method</strong>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4">
               <strong>{order?.shippingAddress.contactName}</strong>
               <br />
               {order?.shippingAddress.addressLine1}
               <br />
               {order?.shippingAddress.addressLine2}
               <br />
               Phone: {order?.shippingAddress.phone}
            </div>
            <div className="col-md-4">{order?.shippingMethod}</div>
            <div className="col-md-4">{order?.paymentMethod}</div>
         </div>

         <table className="table">
            <thead>
               <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Row Total</th>
               </tr>
            </thead>
            <tbody>
               {order?.orderItems.map((item, i) => (
                  <tr key={item.id}>
                     <td>
                        <div className="row">
                           <div className="col-md-3">
                              {images && images.length > 0 && (
                                 <img
                                    src={URL.createObjectURL(images[i])}
                                    style={{ maxWidth: "15vh" }}
                                 />
                              )}
                           </div>
                           <div className="col-md-9">
                              <div>{item.productName}</div>
                              <div>
                                 <small>Quantity:</small> {item.quantity}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td>{item.productPriceString}</td>
                     <td>{item.quantity}</td>
                     <td>{item.discountAmountString}</td>
                     <td>{item.rowTotalString}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
               <table className="table h6">
                  <tbody>
                     <tr>
                        <td>Subtotal</td>
                        <td>{order?.subTotalString}</td>
                     </tr>
                     <tr>
                        <td>Shipping</td>
                        <td>{order?.shippingAmountString}</td>
                     </tr>
                     <tr>
                        <td>Discount</td>
                        <td>{order?.discountAmountString}</td>
                     </tr>
                     <tr>
                        <td>Payment Fee</td>
                        <td>{order?.paymentFeeAmountString}</td>
                     </tr>
                     <tr>
                        <td>Order Total</td>
                        <td>{order?.orderTotalString}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default OrderDetailsMd;
