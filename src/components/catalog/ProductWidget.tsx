import { FC, useEffect, useState } from "react";
import { T_WidgetInstanceViewModel } from "../../types/CoreTypes";
import {
   T_ProductThumbnail,
   T_ProductWidgetComponentVm,
} from "../../types/CatalogTypes";
import { getProductWidgetDetails } from "../../webApis/CatalogWebApi";
import ProductThumbnail from "./ProductThumbnail";

type T_Props = { instance: T_WidgetInstanceViewModel };

const ProductWidget: FC<T_Props> = ({ instance }) => {
   const [productSetting, setProductSetting] =
      useState<T_ProductWidgetComponentVm | null>(null);

   useEffect(() => {
      getProductWidgetDetails(instance).then((res) => setProductSetting(res));
   }, [instance]);

   return (
      <>
         <div className="container-fluid">
            <h4 className="text-center my-4">{instance.name}</h4>
            <div className="row">
               {productSetting &&
                  productSetting.products.map((product: T_ProductThumbnail) => (
                     <div className="col-3" key={product.id}>
                        <ProductThumbnail product={product} />
                     </div>
                  ))}
            </div>
         </div>
         {/* <div className="small">
            <pre>{JSON.stringify(productSetting, null, 3)}</pre>
         </div> */}
      </>
   );
};

export default ProductWidget;
