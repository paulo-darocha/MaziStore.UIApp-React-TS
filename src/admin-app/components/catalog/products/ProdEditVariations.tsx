import { useEffect, useState } from "react";
import {
   T_ProductOption,
   T_ProductOptionVm,
   T_ProductVariationVm,
} from "../../../admin-types/CatalogAdmTypes";
import useProductsHook from "../../../admin-hooks/useProductsHook";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import CreateProductVariations from "./CreateProductVariations";
import { useAppSelector } from "../../../../redux-store/reduxStore";

const ProdEditVariations = () => {
   const [dev, setDev] = useState(false);
   const [productOpts, setProductOpts] = useState<
      T_ProductOption[] | undefined
   >();
   const [selected, setSelected] = useState<string | undefined>();
   const [selectedOptions, setSelectedOptions] = useState<T_ProductOptionVm[]>(
      []
   );

   const editingProduct = useAppSelector((x) => x.editingProduct);
   let variations = useAppSelector((x) => x.editingProduct.variations);
   const { getProductOptionsRepo } = useProductsHook();

   const onClickAddOption = () => {
      if (productOpts && selected) {
         const i = productOpts?.findIndex((x) => x.name == selected);
         const newOpt: T_ProductOptionVm = {
            id: productOpts[i].id,
            name: selected,
            displayType: "",
            values: [],
         };
         if (selectedOptions && selectedOptions.length > 0) {
            setSelectedOptions([...selectedOptions, newOpt]);
         } else {
            setSelectedOptions([newOpt]);
         }
         setProductOpts(productOpts.filter((x) => x.name != selected));
         setSelected("");
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const newVariation: T_ProductVariationVm = editingProduct as any;
         if (variations && variations.length > 0) {
            variations = [...variations, newVariation];
         }
      }
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const onSubmitNewOption = (e: any, i: number) => {
      e.preventDefault();
      console.log(e);
      const value = e.target[0].value;
      const display = e.target[1].value;

      if (value != "" && display != "") {
         const opt = selectedOptions[i];
         opt.displayType =
            opt.name == "color" || opt.name == "Color" ? "Color" : "Text";
         opt.values = [...opt.values, { key: value, display: display }];
         setSelectedOptions(
            selectedOptions.filter((x, index) => (index == i ? opt : x))
         );
      }
   };

   const onClickRemoveOption = (i: number, key: string) => {
      const opt = selectedOptions[i];
      const filtered = opt.values.filter((x) => x.key != key);
      if (filtered.length == 0 || !filtered) {
         setSelectedOptions(
            selectedOptions.filter((x, index) => (index != i ? x : null))
         );
         if (productOpts)
            setProductOpts([...productOpts, { id: opt.id, name: opt.name }]);
         else setProductOpts([{ id: opt.id, name: opt.name }]);
      } else {
         opt.values = filtered;
         setSelectedOptions(
            selectedOptions.filter((x, index) => (index == i ? opt : x))
         );
      }
   };

   useEffect(() => {
      getProductOptionsRepo().then((res) => setProductOpts(res));
      setSelectedOptions(editingProduct.options);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: ProductVariations.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>
         <div>
            <div>
               {/* Options  */}
               <div className="row mt-3 text-sm-end">
                  <label className="col-sm-2 col-form-label h6">
                     Available Options
                  </label>
                  <div className="col-sm-3">
                     <div className="input-group">
                        <select
                           className="form-select"
                           onChange={(e) => setSelected(e.target.value)}
                        >
                           <option value="">select a option</option>
                           {productOpts &&
                              productOpts.map((opt) => (
                                 <option key={opt.id} value={opt.name}>
                                    {opt.name}
                                 </option>
                              ))}
                        </select>
                        <Button onClick={onClickAddOption}>Add</Button>
                     </div>
                  </div>
                  <div className="col-9"></div>
               </div>

               <div>
                  <div>
                     {selectedOptions &&
                        selectedOptions.map((opt, i) => (
                           <div className="row mt-3">
                              <div className="offset-1 col-7">
                                 <form
                                    onSubmit={(e) => onSubmitNewOption(e, i)}
                                    className="input-group"
                                 >
                                    <div className="col-6">
                                       <div className="input-group">
                                          <span className="input-group-text">
                                             {opt.name}
                                          </span>
                                          <input
                                             className="form-control"
                                             name={opt.name}
                                             placeholder="Option value"
                                          />
                                       </div>
                                    </div>

                                    <div className="col-5">
                                       <div className="input-group">
                                          {opt.name == "color" ||
                                          opt.name == "Color" ? (
                                             <input
                                                type="color"
                                                className="form-control form-control-color"
                                                style={{ width: "50px" }}
                                             />
                                          ) : (
                                             <input
                                                type="text"
                                                className="form-control"
                                                placeholder="description"
                                                defaultValue=""
                                             />
                                          )}
                                       </div>
                                    </div>

                                    <div className="col-1">
                                       <Button type="submit">
                                          <FontAwesomeIcon icon={faPlus} />
                                       </Button>
                                    </div>
                                 </form>
                              </div>

                              <div className="col-3 text-start">
                                 {opt.values.map((val) => (
                                    <>
                                       {val.key != null && (
                                          <span
                                             style={
                                                opt.name == "color" ||
                                                opt.name == "Color"
                                                   ? {
                                                        backgroundColor:
                                                           val.display,
                                                     }
                                                   : {
                                                        backgroundColor: "#888",
                                                     }
                                             }
                                             className="badge m-1 p-2"
                                          >
                                             {val.key}
                                             <span className="p-1">
                                                <FontAwesomeIcon
                                                   icon={faX}
                                                   onClick={() =>
                                                      onClickRemoveOption(
                                                         i,
                                                         val.key
                                                      )
                                                   }
                                                />
                                             </span>
                                          </span>
                                       )}
                                    </>
                                 ))}
                              </div>
                           </div>
                        ))}
                  </div>
               </div>

               <div className="row mt-3 text-sm-end"></div>
            </div>

            <h5>Add properties for the new selectedOptions:</h5>
            <p>
               Fields not filled in will inherit the values from main product
            </p>
            <h6>Options to include in new variation:</h6>
            {variations &&
               variations.length > 0 &&
               variations.map((variation) => (
                  <CreateProductVariations
                     variation={variation}
                     selectedOptions={selectedOptions}
                  />
               ))}
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  ProductEditVariations.tsx
               </Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(editingProduct, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProdEditVariations;
