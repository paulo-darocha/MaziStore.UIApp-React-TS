import { useEffect, useState } from "react";
import { getOrdersList } from "../../webApis/OrdersWebApi";
import { T_OrderHistoryListItem } from "../../types/AuthTypes";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../webApis/CoreWebApi";

const UserOrders = () => {
   const [dev, setDev] = useState(false);
   const [orders, setOrders] = useState<T_OrderHistoryListItem[]>([]);
   const [images, setImages] = useState<Blob[]>([]);
   const navigate = useNavigate();
   let i = 0;

   useEffect(() => {
      getOrdersList().then((res) => setOrders(res));
   }, []);

   useEffect(() => {
      const getImagesFromApi = async () => {
         const imagesPromise: Promise<Blob>[] = [];
         orders.forEach((order) => {
            order.orderItems.forEach((item) => {
               console.log(item.productId);
               imagesPromise.push(getImage(item.thumbnailImage));
            });
         });
         return await Promise.all(imagesPromise);
      };

      getImagesFromApi().then((res) => setImages(res));
   }, [orders]);

   return (
      <div>
         <div
            style={{ fontSize: "10px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: UserOrders [JSON]
         </div>
         <div className="text-center h4 my-3">UserOrders</div>

         <div>
            <table className="table">
               <thead>
                  <tr>
                     <th>Order Id</th>
                     <th>Date</th>
                     <th>Products</th>
                     <th>SubTotal</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {orders &&
                     orders.map((order) => (
                        <tr key={order.id}>
                           <td>
                              <Button
                                 variant="outline-primary"
                                 onClick={() =>
                                    navigate(`/profile/order/${order.id}`)
                                 }
                              >
                                 <small>ORDER #{order.id}</small>
                              </Button>
                           </td>
                           <td>{new Date(order.createdOn).toLocaleString()}</td>
                           <td>
                              {order.orderItems.map((item) => (
                                 <div className="row" key={item.thumbnailImage}>
                                    <div className="col-3 p-1">
                                       {images && images.length > 0 && (
                                          <img
                                             src={URL.createObjectURL(
                                                images[i++]
                                             )}
                                             style={{ maxWidth: "13vh" }}
                                          />
                                       )}
                                    </div>
                                    <div className="col-9">
                                       <div>{item.productName}</div>
                                       <div>
                                          <small>Quantity:</small>{" "}
                                          {item.quantity}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </td>
                           <td>{order.subTotalString}</td>
                           <td>{order.orderStatus}</td>
                        </tr>
                     ))}
               </tbody>
            </table>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>UserOrders.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(orders, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default UserOrders;
