import { useEffect, useState } from "react";
import { getOrderDetails } from "../../webApis/OrdersWebApi";
import { useParams } from "react-router-dom";
import { T_OrderDetailVm } from "../../types/OrderTypes";
import { Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import { useAppSelector } from "../../redux-store/reduxStore";
import OrderDetailsMd from "./OrderDetailsMd";
import OrderDetailsSm from "./OrderDetailsSm";

const OrderDetails = () => {
   const [dev, setDev] = useState(false);
   const [order, setOrder] = useState<T_OrderDetailVm | undefined>();
   const [images, setImages] = useState<Blob[]>([]);

   const params = useParams();
   const token = useAppSelector((x) => x.token);

   useEffect(() => {
      const numberId = Number(params.id);
      if (numberId > 0)
         getOrderDetails(numberId, token).then((res) => setOrder(res));
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

         <div className="d-none d-md-block">
            <OrderDetailsMd order={order} images={images} />
         </div>

         <div className="d-block d-md-none">
            <OrderDetailsSm order={order} images={images} />
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
