import { ChangeEvent, FC, useEffect, useState } from "react";
import { T_ProductsByCategory } from "../../types/CategoriesTypes";

type T_Props = { category: T_ProductsByCategory };

const CategoriesOptions: FC<T_Props> = ({ category }) => {
   const [min, setMin] = useState(0);
   const [max, setMax] = useState(500);

   const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value < max) setMin(value);
   };

   const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value > min) setMax(value);
   };

   useEffect(() => {}, []);

   return (
      <div className="ps-3">
         <h5 className="mt-5">Choose price range</h5>
         <div className="mt-2">
            <div>
               <label htmlFor="temp">Min: {min}</label>
            </div>
            <span className="p-1">1</span>
            <input
               type="range"
               value={min}
               min={1}
               max={100}
               onChange={onChangeMinValue}
            />
            <span className="p-1">100</span>
         </div>

         <div className="mt-2">
            <div>
               <label htmlFor="temp">Max: {max}</label>
            </div>
            <span className="p-1">1</span>
            <input
               type="range"
               value={max}
               min={1}
               max={100}
               onChange={onChangeMaxValue}
            />
            <span className="p-1">100</span>
         </div>
      </div>
   );
};

export default CategoriesOptions;
