import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import { T_ProductResult } from "../../types/CatalogAdmTypes";
import ProductsTable from "./ProductsTable";
import ProductsTableSm from "./ProductsTableSm";

const Products = () => {
   const [products, setProducts] = useState<T_ProductResult | undefined>();
   const { getProductListRepo } = useProducts();

   useEffect(() => {
      getProductListRepo().then((res) => {
         if (res) setProducts(res);
      });
   }, []);

   return (
      <div>
         <div className="text-center mt-3 h4">Products List</div>
         {products && (
            <>
               <div className="d-none d-md-block">
                  <ProductsTable items={products.items} />
               </div>
               <div className="d-block d-md-none">
                  <ProductsTableSm items={products.items} />
               </div>
            </>
         )}
      </div>
   );
};

export default Products;
