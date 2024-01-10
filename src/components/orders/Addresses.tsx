import { ChangeEvent, FC, useEffect, useState } from "react";
import {
   T_OrderTaxAndShippingPriceVm,
   T_ShippingAddressVm,
   T_TaxAndShippingPriceRequestVm,
} from "../../types/OrderTypes";
import { getShipAndTaxPrices } from "../../webApis/OrdersWebApi";

type T_Props = {
   shippingAddresses: T_ShippingAddressVm[];
   setShippingData: (data: T_OrderTaxAndShippingPriceVm) => void;
};

const Addresses: FC<T_Props> = ({ shippingAddresses, setShippingData }) => {
   const [addressId, setAddressId] = useState<number>(0);
   const [shipProvider, setShipProvider] =
      useState<T_OrderTaxAndShippingPriceVm | null>(null);

   useEffect(() => {
      if (addressId !== 0) {
         const data: T_TaxAndShippingPriceRequestVm = {
            existingShippingAddressId: addressId,
         };
         getShipAndTaxPrices(data).then((res) => setShipProvider(res));
      }
   }, [addressId]);

   const onSetShippingMethod = (e: ChangeEvent<HTMLInputElement>) => {
      if (shippingAddresses) {
         const data: T_OrderTaxAndShippingPriceVm = {
            ...shipProvider!,
            selectedShippingMethodName: e.target.value,
            shippingAddressId: addressId,
         };
         setShippingData(data);
      }
   };

   return (
      <div>
         <div>
            {shippingAddresses.length > 0 &&
               shippingAddresses.map(
                  (address: T_ShippingAddressVm, i: number) => (
                     <div key={address.addressLine1}>
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

            {shippingAddresses && (
               <>
                  <hr />
                  <div className="h5">Shipping Method</div>
                  <div>
                     <strong className="ms-2">
                        {shipProvider?.shippingPrices.map((price) => (
                           <>
                              <input
                                 onChange={(e) => onSetShippingMethod(e)}
                                 value={price.name}
                                 type="checkbox"
                                 style={{ transform: "scale(1.2)" }}
                              />
                              <label className="ms-3">
                                 {price.name} &emsp; ({price.priceText})
                              </label>
                           </>
                        ))}
                     </strong>
                  </div>
               </>
            )}
         </div>
         <br />
      </div>
   );
};

export default Addresses;
