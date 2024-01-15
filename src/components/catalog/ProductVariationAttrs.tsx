/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
   T_ProductDetailOption,
   T_ProductDetailVariation,
} from "../../types/CatalogTypes";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import React from "react";
import ProductPrices from "./ProductPrices";

type T_Props = {
   availableOptions: T_ProductDetailOption[];
   variations: T_ProductDetailVariation[];
};
type T_Dictionary = { [name: string]: string };

const ProductVariationAttrs: FC<T_Props> = ({
   availableOptions,
   variations,
}) => {
   const [pending, setPending] = useState(false);
   const [check, setCheck] = useState(false);
   const [color, setColor] = useState("");
   const [options, setOptions] = useState<T_Dictionary>({});
   const [variation, setVariation] = useState<T_ProductDetailVariation>(
      variations[0]
   );

   const onSetChoice = (e: ChangeEvent<HTMLInputElement>) => {
      setPending(false);
      const name: string = e.target.name;
      const value: string = e.target.value;
      if (name == "Color") setColor(value);

      const state = options;
      state[name] = value;
      setOptions(state);
      setCheck(!check);
   };

   const getColor = (cor: string) => {
      const result = {
         backgroundColor: `${cor}`,
         minWidth: "80px",
         fontWeight: "bold",
         border: "none",
      };
      if (cor === color) {
         return { ...result, border: "3px solid blue" };
      } else return result;
   };

   useEffect(() => {
      setPending(false);

      const chosenVar = variations.find((x) => {
         const array1 = x.normalizedName.split("-").sort().join(",");
         const array2 = Object.values(options).sort().join(",");
         if (array1.length > array2.length) setPending(true);
         else if (array1.length == array2.length) setPending(false);
         return array1 === array2;
      });
      if (chosenVar) {
         setVariation(chosenVar);
      }
   }, [check]);

   return (
      <div>
         <div>
            {availableOptions.map((option: T_ProductDetailOption) => (
               <div className="row" key={option.optionId}>
                  <div className="col-2 h5 mt-3 mb-0">{option.optionName}</div>
                  <ButtonGroup>
                     {option.values.map((opt: string) => (
                        <React.Fragment key={opt}>
                           {option.optionName === "Color" ? (
                              <div className="col-3 my-1">
                                 <ToggleButton
                                    name={option.optionName}
                                    key={`id-${opt}`}
                                    variant="outline-dark"
                                    id={`id-${opt}`}
                                    value={opt}
                                    type="radio"
                                    style={getColor(opt)}
                                    checked={opt === color}
                                    onChange={(e) => onSetChoice(e)}
                                 >
                                    {opt}
                                 </ToggleButton>
                              </div>
                           ) : (
                              <div className="col-3 my-2 form-check">
                                 <input
                                    style={{ marginTop: "10px" }}
                                    value={opt}
                                    type="radio"
                                    className="form-check-input"
                                    name={option.optionName}
                                    id={opt}
                                    onChange={(e) => onSetChoice(e)}
                                 />
                                 <label
                                    className="btn btn-outline-dark"
                                    htmlFor={opt}
                                    style={{ minWidth: "60px" }}
                                 >
                                    {opt}
                                 </label>
                              </div>
                           )}
                        </React.Fragment>
                     ))}
                  </ButtonGroup>
               </div>
            ))}
            {variation ? (
               <ProductPrices product={variation} pending={pending} />
            ) : (
               <span>Please choose the options</span>
            )}
         </div>
         {/* <span style={{ fontSize: "9px" }}>dev:{check}</span>
         <span style={{ fontSize: "10px" }}>dev:{JSON.stringify(options)}</span>
         <br />
         <span style={{ fontSize: "10px" }}>
            dev:{JSON.stringify(availableOptions)}
         </span> */}
      </div>
   );
};

export default ProductVariationAttrs;
