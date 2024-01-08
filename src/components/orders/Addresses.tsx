import { FC, useEffect, useState } from "react";
import {
   T_ShippingAddressVm,
   T_TaxAndShippingPriceRequestVm,
} from "../../types/OrderTypes";
import { getShipAndTaxPrices } from "../../webApis/OrdersWebApi";

type T_Props = { shippingAddresses: T_ShippingAddressVm[] };

const Addresses: FC<T_Props> = ({ shippingAddresses }) => {
   const [addressId, setAddressId] = useState<number>(0);

   useEffect(() => {
      if (addressId !== 0) {
         const data: T_TaxAndShippingPriceRequestVm = {
            existingShippingAddressId: addressId,
         };
         getShipAndTaxPrices(data).then();
      }
   }, [addressId]);

   return (
      <div>
         <div>
            {shippingAddresses.length > 0 &&
               shippingAddresses.map(
                  (address: T_ShippingAddressVm, i: number) => (
                     <div>
                        {i === 0 && <hr />}
                        <div>
                           <input
                              type="checkbox"
                              checked={address.userAddressId === addressId}
                              style={{ transform: "scale(1.2)" }}
                              onChange={() =>
                                 setAddressId(address.userAddressId)
                              }
                           />
                           <strong className="ms-2">
                              {address.userAddressId}.{address.contactName}
                           </strong>
                        </div>
                        <div className="ms-5">{address.addressLine1}</div>
                        <div className="ms-5">{address.addressLine2}</div>
                        <hr />
                     </div>
                  )
               )}

            <div className="h5">Billing Address</div>
            <div>
               <input
                  type="checkbox"
                  checked
                  disabled
                  style={{ transform: "scale(1.2)" }}
               />
               <strong className="ms-2">
                  Use Shipping Address as Billing Address
               </strong>
            </div>
         </div>
      </div>
   );
};

export default Addresses;
