import { ChangeEvent, FC, useEffect, useState } from "react";
import {
   T_ProductOptionVm,
   T_ProductVariationVm,
} from "../../admin-types/CatalogAdmTypes";
import { Button, Modal } from "react-bootstrap";
import VariationPropModal from "./VariationPropModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";

type T_Props = {
   selectedOptions: T_ProductOptionVm[];
   variation: T_ProductVariationVm;
};
type T_ProductOpts = { id: number; type: string; value: string };

const CreateProductselectedOptions: FC<T_Props> = ({
   selectedOptions,
   variation,
}) => {
   const [showProperties, setShowProperties] = useState(false);
   const [dev, setDev] = useState(false);
   const [choice, setChoice] = useState<T_ProductOpts[]>([
      { id: 1, type: "", value: "" },
   ]);
   const [check, setCheck] = useState(false);
   const [optString, setOptString] = useState<string>("");

   // const keyIsSelected = (key: string) => {
   //    return variation.name.includes(key);
   // };

   const onSelectOptValue = (e: ChangeEvent<HTMLSelectElement>, i: number) => {
      const type = selectedOptions[i].name;
      const value = e.target.value;

      const array = choice;
      const index = array.findIndex((x) => x.id == 1 && x.type == type);
      if (index > -1) array[index] = { ...array[index], value: value };
      else array.push({ id: 1, type, value });
      setChoice(array);
      setCheck(!check);
   };

   useEffect(() => {
      setOptString(variation.normalizedName.split("-").join(" "));
   }, [variation]);

   useEffect(() => {
      const array = choice.filter((x) => x.id == 1);
      const values = array.map((x) => x.value);
      setOptString(values.join(" "));
   }, [choice]);

   useEffect(() => {
      const array = choice.filter((x) => x.id == 1);
      const values = array.map((x) => x.value);
      setOptString(values.join(" "));
   }, [check]);

   return (
      <div>
         <div style={{ fontSize: "9px" }}>
            DEV: CreateProductVariation.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <form>
            <div className="row border border-dark m-2">
               <div className="col-3">
                  {selectedOptions &&
                     selectedOptions.map((x, i) => (
                        <div className="row my-1">
                           <label className="col-4">{x.name}</label>
                           <div className="col-8">
                              <select
                                 className="form-select"
                                 onChange={(e) => onSelectOptValue(e, i)}
                              >
                                 <option value="">Choose Value</option>
                                 {selectedOptions[i].values.map((y) => (
                                    <option
                                       selected={variation.normalizedName.includes(
                                          y.key.trim()
                                       )}
                                       value={y.key}
                                    >
                                       {y.key}
                                    </option>
                                 ))}
                                 <option value="">Don't include</option>
                              </select>
                           </div>
                        </div>
                     ))}
               </div>
               <div className="col-5">
                  <label className="col-form-label">
                     Variation Name:&emsp;
                  </label>
                  <span className="h6">{`${variation.name} - ${optString}`}</span>
                  <label className="col-form-label">
                     Normalized Name:&emsp;
                  </label>
                  <span className="h6">{`${variation.normalizedName} - ${optString}`}</span>
               </div>
               <div className="col-4">
                  <Button
                     className="m-3"
                     variant="outline-primary"
                     size="sm"
                     onClick={() => setShowProperties(true)}
                  >
                     <FontAwesomeIcon icon={faExchange} className="px-1" />
                     Change Properties
                  </Button>
                  <Modal
                     show={showProperties}
                     onHide={() => setShowProperties(false)}
                  >
                     <VariationPropModal
                        variation={variation}
                        setShow={setShowProperties}
                     />
                  </Modal>
                  <div className="row"></div>
               </div>
            </div>
         </form>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  ProductEditselectedOptions.tsx
               </Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(selectedOptions, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CreateProductselectedOptions;
