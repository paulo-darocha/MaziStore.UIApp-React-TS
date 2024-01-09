import { ChangeEvent, Dispatch, FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { T_AddressFormVm } from "../../types/OrderTypes";
import {
   getStateFromCountry,
   sendAddressToServer,
} from "../../webApis/CoreWebApi";


type T_Props = {
   addressForm?: T_AddressFormVm;
   newAddress?: Dispatch<React.SetStateAction<number>>;
};
type T_SelectState = { id: string; name: string };

const NewAddressForm: FC<T_Props> = ({ addressForm, newAddress }) => {
   const [showNewAddr, setShowNewAddr] = useState(false);
   const [state, setState] = useState<T_SelectState[]>();

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm<T_AddressFormVm>({
      mode: "onBlur",
      defaultValues: addressForm,
   });

   const onChangeChooseCountry = (e: ChangeEvent<HTMLSelectElement>) => {
      getStateFromCountry(e.target.value).then((res) => {
         setState(res.statesOrProvinces);
      });
   };

   const onClickSubmitForm = async (data: T_AddressFormVm) => {
      sendAddressToServer(data).then((res) => {
         newAddress && newAddress(res.addressId);
         setShowNewAddr(false);
      });
   };

   return (
      <div>
         <div className="mt-3">
            <span className="h4">Shipping Address: &emsp;</span>
            <span className="float-end">
               <Button
                  variant="outline-secondary"
                  className="py-1 mx-1"
                  onClick={() => setShowNewAddr(true)}
               >
                  Create New Address
               </Button>
            </span>
         </div>
         <div className="text-center">
            <Modal
               show={showNewAddr}
               size="lg"
               onHide={() => setShowNewAddr(false)}
            >
               <Modal.Header closeButton>New Shipping Address</Modal.Header>

               <form onSubmit={handleSubmit(onClickSubmitForm)}>
                  <div className="text-end">
                     <Modal.Body>
                        {/* Contact Name */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>Contact Name</h5>
                           </label>
                           <div className="col-md-9">
                              <input
                                 {...register("contactName", {
                                    required: {
                                       value: true,
                                       message: "please enter your name",
                                    },
                                 })}
                                 className="form-control"
                              />
                              {errors.contactName &&
                                 errors.contactName.message && (
                                    <span className="text-danger h6 small">
                                       {errors.contactName.message}
                                    </span>
                                 )}
                           </div>
                        </div>

                        {/* Country */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>Country</h5>
                           </label>
                           <div className="col-md-9">
                              <select
                                 {...register("countryId", {
                                    required: {
                                       value: true,
                                       message: "please select a country",
                                    },
                                 })}
                                 className="form-select"
                                 onChange={(e) => onChangeChooseCountry(e)}
                              >
                                 <option disabled selected>
                                    Choose a Country
                                 </option>
                                 {addressForm &&
                                    addressForm.shippableCountries &&
                                    addressForm.shippableCountries.map(
                                       (country) => (
                                          <option
                                             value={country.value}
                                             key={country.text}
                                          >
                                             {country.text}
                                          </option>
                                       )
                                    )}
                              </select>
                              {errors.countryId && errors.countryId.message && (
                                 <span className="text-danger h6 small">
                                    {errors.countryId.message}
                                 </span>
                              )}
                           </div>
                        </div>

                        {/* State/Province */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>State/Province</h5>
                           </label>
                           <div className="col-md-9">
                              <select
                                 {...register("stateOrProvinceId", {
                                    required: {
                                       value: true,
                                       message: "please enter a state",
                                    },
                                 })}
                                 className="form-select"
                              >
                                 <option disabled selected>
                                    Choose a State/Province
                                 </option>
                                 {state &&
                                    state.map((x) => (
                                       <option value={x.id} key={x.id}>
                                          {x.name}
                                       </option>
                                    ))}
                              </select>
                              {errors.stateOrProvinceId &&
                                 errors.stateOrProvinceId.message && (
                                    <span className="text-danger h6 small">
                                       {errors.stateOrProvinceId.message}
                                    </span>
                                 )}
                           </div>
                        </div>

                        {/* City */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>City</h5>
                           </label>
                           <div className="col-md-9">
                              <input
                                 {...register("city", {
                                    required: {
                                       value: true,
                                       message: "please enter the city name",
                                    },
                                 })}
                                 className="form-control"
                              />
                              {errors.city && errors.city.message && (
                                 <span className="text-danger h6 small">
                                    {errors.city.message}
                                 </span>
                              )}
                           </div>
                        </div>

                        {/* Postal Code */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>Postal Code</h5>
                           </label>
                           <div className="col-md-9">
                              <input
                                 {...register("zipCode", {
                                    required: {
                                       value: true,
                                       message: "please enter the ZipCode",
                                    },
                                 })}
                                 className="form-control"
                              />
                              {errors.zipCode && errors.zipCode.message && (
                                 <span className="text-danger h6 small">
                                    {errors.zipCode.message}
                                 </span>
                              )}
                           </div>
                        </div>

                        {/* Address */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>Address</h5>
                           </label>
                           <div className="col-md-9">
                              <input
                                 {...register("addressLine1", {
                                    required: {
                                       value: true,
                                       message:
                                          "please enter your address (street, number, ...)",
                                    },
                                 })}
                                 className="form-control"
                              />
                              {errors.addressLine1 &&
                                 errors.addressLine1.message && (
                                    <span className="text-danger h6 small">
                                       {errors.addressLine1.message}
                                    </span>
                                 )}
                           </div>
                        </div>

                        {/* Phone */}
                        <div className="row form-group my-2">
                           <label className="col-md-3 col-form-label">
                              <h5>Phone</h5>
                           </label>
                           <div className="col-md-9">
                              <input
                                 {...register("phone", {
                                    required: {
                                       value: true,
                                       message: "please enter your phone",
                                    },
                                 })}
                                 className="form-control"
                              />
                              {errors.phone && errors.phone.message && (
                                 <span className="text-danger h6 small">
                                    {errors.phone.message}
                                 </span>
                              )}
                           </div>
                        </div>
                     </Modal.Body>

                     <Modal.Footer>
                        <Button className="m-3" type="submit">
                           Save
                        </Button>
                        <Button
                           variant="outline-primary"
                           onClick={() => setShowNewAddr(false)}
                        >
                           Close
                        </Button>
                     </Modal.Footer>
                  </div>
               </form>
            </Modal>
         </div>
      </div>
   );
};

export default NewAddressForm;
