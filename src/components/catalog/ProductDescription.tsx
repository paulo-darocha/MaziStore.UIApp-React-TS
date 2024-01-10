import { FC } from "react";
import {
   T_ProductDetail,
   T_ProductDetailAttribute,
} from "../../types/CatalogTypes";

type T_Props = { product: T_ProductDetail };

const ProductDescription: FC<T_Props> = ({ product }) => {
   return (
      <div>
         <div>
            <div>
               {product.description && (
                  <div>
                     <h3>Product Description</h3>
                     <div
                        dangerouslySetInnerHTML={{
                           __html: product.description,
                        }}
                     />
                  </div>
               )}
               {product.specification && (
                  <div>
                     <h3>Product Specifications</h3>
                     {product.specification}
                  </div>
               )}
               {product.attributes && product.attributes.length > 0 && (
                  <div>
                     <h3>Product Attributes</h3>
                     <table className="table">
                        {product.attributes.map(
                           (attr: T_ProductDetailAttribute) => (
                              <tr key={attr.value}>
                                 <td>{attr.name}</td>
                                 <td>{attr.value}</td>
                              </tr>
                           )
                        )}
                     </table>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ProductDescription;
