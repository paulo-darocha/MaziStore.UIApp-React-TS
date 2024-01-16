import { useEffect, useState } from "react";
import { getOrdersList } from "../../webApis/OrdersWebApi";
import { T_OrderHistoryListItem } from "../../types/AuthTypes";
import { Modal } from "react-bootstrap";

import { getImage } from "../../webApis/CoreWebApi";
import { useAppSelector } from "../../redux-store/reduxStore";
import OrdersTable from "./OrdersTable";
import OrdersTableSm from "./OrdersTableSm";

const UserOrders = () => {
   const [dev, setDev] = useState(false);
   const [orders, setOrders] = useState<T_OrderHistoryListItem[]>([]);
   const [images, setImages] = useState<Blob[]>([]);

   const token = useAppSelector((x) => x.token);

   useEffect(() => {
      getOrdersList(token).then((res) => setOrders(res));
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
            DEV: User Orders [JSON]
         </div>
         <div className="text-center h5">User Orders</div>

         {orders && images && (
            <div className="d-none d-md-block">
               <OrdersTable orders={orders} images={images} />
            </div>
         )}

         {orders && images && (
            <div className="d-block d-md-none">
               <OrdersTableSm orders={orders} images={images} />
            </div>
         )}

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
