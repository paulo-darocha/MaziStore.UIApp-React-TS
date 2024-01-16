import { FC } from "react";
import { T_OrderDetailVm } from "../../types/OrderTypes";

type T_Props = { order?: T_OrderDetailVm; images?: Blob[] };

const OrderDetailsSm: FC<T_Props> = ({ order, images }) => {
   return (
      <div>
         <div className="row">
            <div className="col-md-7">
               <h6>Order Status: {order?.orderStatusString} Order</h6>
            </div>
            <h6 className="col-md-5">
               Order data: {new Date(order?.createdOn ?? "").toLocaleString()}
            </h6>
         </div>
         <h5 className="mt-3 text-center">Shipping Address:</h5>
         <strong>{order?.shippingAddress.contactName}</strong>
         <br />
         {order?.shippingAddress.addressLine1}
         <br />
         {order?.shippingAddress.addressLine2}
         <br />
         Phone: {order?.shippingAddress.phone}
         <h5 className="mt-3 text-center">Shipping Method:</h5>
         <div>{order?.shippingMethod}</div>
         <h5 className="mt-3 text-center">Payment Method:</h5>
         <div>{order?.paymentMethod}</div>
         <h5 className="mt-3 text-center">Products:</h5>
         {order?.orderItems.map((item, i) => (
            <table className="table">
               <thead>
                  <tr>
                     <th colSpan={3}>Product</th>
                  </tr>
               </thead>
               <tbody>
                  <tr key={item.id}>
                     <td>
                        {images && images.length > 0 && (
                           <img
                              src={URL.createObjectURL(images[i])}
                              style={{ maxWidth: "15vh" }}
                           />
                        )}
                     </td>
                     <td colSpan={2}>
                        <div>{item.productName}</div>
                        <small>Quantity:</small> {item.quantity}
                     </td>
                  </tr>
                  <tr className="text-end">
                     <td>
                        <strong>Price:</strong> {item.productPriceString}
                     </td>
                     <td colSpan={2}>
                        <strong>Discount:</strong> {item.discountAmountString}
                     </td>
                  </tr>
                  <tr className="text-end">
                     <td></td>
                     <td>
                        <strong>Total:</strong>{" "}
                     </td>
                     <td>{item.rowTotalString}</td>
                  </tr>
               </tbody>
            </table>
         ))}
         <div className="row">
            <div>
               <table className="table h6 text-end">
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

export default OrderDetailsSm;
