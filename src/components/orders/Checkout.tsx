import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import NewAddressForm from "./NewAddressForm";
import { T_DeliveryInformationVm } from "../../types/OrderTypes";
import { getShippingInformation } from "../../webApis/OrdersWebApi";
import { Modal } from "react-bootstrap";
import Addresses from "./Addresses";

const Checkout = () => {
   const [shipInfo, setShipInfo] = useState<T_DeliveryInformationVm | null>(
      null
   );
   const [dev, setDev] = useState(false);
   const [newAddr, setNewAddr] = useState(false);

   useEffect(() => {
      getShippingInformation().then((res) => setShipInfo(res));
   }, [newAddr]);

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [Checkout - JSON]
         </div>

         <div className="h4 text-center py-2">Checkout</div>

         <div className="row">
            <div className="col-md-7">
               <NewAddressForm
                  addressForm={shipInfo?.newAddressForm}
                  newAddress={setNewAddr}
               />
               {shipInfo && (
                  <Addresses
                     shippingAddresses={shipInfo?.existingShippingAddresses}
                  />
               )}
            </div>

            <div className="col-md-5 border">
               <OrderSummary />
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Checkout.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(shipInfo, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default Checkout;
