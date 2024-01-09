import { useEffect, useState } from "react";
import { getOrderDetails } from "../../webApis/OrdersWebApi";
import { useParams } from "react-router-dom";
import { T_OrderDetailVm } from "../../types/OrderTypes";
import { Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";

const OrderDetails = () => {
   const [dev, setDev] = useState(false);
   const params = useParams();
   const [order, setOrder] = useState<T_OrderDetailVm | undefined>();
   const [images, setImages] = useState<Blob[]>([]);

   useEffect(() => {
      const numberId = Number(params.id);
      if (numberId > 0) getOrderDetails(numberId).then((res) => setOrder(res));
   }, [params]);

   useEffect(() => {
      const getImagesFromApi = async () => {
         if (order) {
            const imagesPromise = order.orderItems.map((item) =>
               getImage(item.productImage)
            );
            return await Promise.all(imagesPromise);
         }
      };
      getImagesFromApi().then((res) => setImages(res ?? []));
   }, [order]);

   return (
      <div>
         <div
            style={{ fontSize: "10px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: OrderDetails [JSON]
         </div>
         <div className="text-center h4 my-3">OrderDetails #{params.id}</div>

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

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>UserOrders.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(order, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default OrderDetails;
