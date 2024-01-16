import { useEffect, useState } from "react";
import { T_UserAddressListItem } from "../../types/CoreTypes";
import {
   getAddressesFromServer,
   getFormForNewAddress,
} from "../../webApis/CoreWebApi";
import { Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NewAddressForm from "../orders/NewAddressForm";
import { T_AddressFormVm } from "../../types/OrderTypes";
import { useAppSelector } from "../../redux-store/reduxStore";

const UserAddresses = () => {
   const [dev, setDev] = useState(false);
   const [addresses, setAddresses] = useState<T_UserAddressListItem[]>();
   const [addressForm, setAddressForm] = useState<T_AddressFormVm>();
   const navigate = useNavigate();
   const token = useAppSelector((x) => x.token);
   const modified = useAppSelector((x) => x.modified);

   useEffect(() => {
      getAddressesFromServer(token).then((res) => setAddresses(res));
      // getShippingInformation().then((res) => setShipInfo(res));
      getFormForNewAddress(token).then((res) => setAddressForm(res));
   }, [modified, token]);

   return (
      <div>
         <div
            style={{ fontSize: "10px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: UserAddressess [JSON]
         </div>

         <div className="text-center">
            <NewAddressForm addressForm={addressForm} />
         </div>

         <br />

         <div className="container">
            <div className="row">
               {addresses &&
                  addresses.map((addr, i) => (
                     <div
                        key={addr.addressId}
                        className="col-12 col-md-6 col-lg-4"
                     >
                        <Card className="m-2">
                           <Card.Header>
                              <span>Address {i + 1}</span>
                              <Button
                                 variant="outline-dark"
                                 className="float-end"
                                 onClick={() =>
                                    navigate(`/address/${addr.addressId}`)
                                 }
                              >
                                 Edit Address
                              </Button>
                           </Card.Header>

                           <Card.Body>
                              <div>
                                 <div style={{ fontSize: "1.1em" }}>
                                    Contact: {addr.contactName}
                                 </div>
                                 <div>{addr.addressLine1}</div>
                                 <div>{addr.districtName}</div>
                                 <div>{addr.cityName}</div>
                                 <div>
                                    {addr.stateOrProvinceName}, {"  "}
                                    {addr.countryName}
                                 </div>
                                 <div>Phone: {addr.phone}</div>
                              </div>
                           </Card.Body>
                        </Card>
                     </div>
                  ))}
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>UserAddresses.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(addresses, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default UserAddresses;
