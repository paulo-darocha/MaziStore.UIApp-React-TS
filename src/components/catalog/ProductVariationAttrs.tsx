import { ChangeEvent, FC, useEffect, useState } from "react";
import { T_ProductDetailOption } from "../../types/CatalogTypes";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

type T_Props = { variations: T_ProductDetailOption[] };
type T_Options = { name: string; value: string };

const ProductVariationAttrs: FC<T_Props> = ({ variations }) => {
   const [color, setColor] = useState("");
   const [options, setOptions] = useState<T_Options[]>([]);

   const onSetChoice = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      let state = options;
      const index = state.findIndex((x) => x.name === name);
      if (index > -1) {
         state.splice(index, 1, { name, value });
      } else {
         state = [...state, { name, value }];
      }
      setOptions(state);
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

   // const shouldCheck = (name: string, value: string) => {
   //    const index = options.findIndex((x) => x.name === name);
   //    if (index > -1 && options[index].value === value) {
   //       return true;
   //    }
   //    return false;
   // };

   return (
      <div>
         <div>
            {variations.map((option: T_ProductDetailOption) => (
               <div className="row">
                  <div className="col-2 h5 mt-2 mb-0">{option.optionName}</div>
                  <ButtonGroup>
                     {option.values.map((opt: string) => (
                        <>
                           {option.optionName === "Color" ? (
                              <div className="col-3 my-2">
                                 <ToggleButton
                                    name={option.optionName}
                                    key={`id-${opt}`}
                                    variant="outline-dark"
                                    id={`id-${opt}`}
                                    value={opt}
                                    type="radio"
                                    style={getColor(opt)}
                                    checked={opt === color}
                                    onChange={(e) =>
                                       setColor(e.currentTarget.value)
                                    }
                                 >
                                    {opt}
                                 </ToggleButton>
                              </div>
                           ) : (
                              <div className="col-3 my-3 form-check">
                                 <input
                                    value={opt}
                                    type="radio"
                                    className="form-check-input"
                                    name={option.optionName}
                                    id={opt}
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
                        </>
                     ))}
                  </ButtonGroup>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ProductVariationAttrs;
