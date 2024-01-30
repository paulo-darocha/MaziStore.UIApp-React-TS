import { useEffect, useState } from "react";
import useProducts from "../../admin-hooks/useProductsHook";
import { T_ProductResult } from "../../admin-types/CatalogAdmTypes";
import ProductsTable from "./ProductsTable";
import ProductsTableSm from "./ProductsTableSm";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Products = () => {
   const [products, setProducts] = useState<T_ProductResult | undefined>();
   const { getProductListRepo } = useProducts();
   const navigate = useNavigate();

   useEffect(() => {
      getProductListRepo().then((res) => {
         if (res) setProducts(res);
      });
   }, []);

   return (
      <div>
         <div className="text-center mt-3">
            <span className="h4">Products List</span>
            <Button
               className="float-end mx-5"
               onClick={() => navigate("edit/0/part1")}
            >
               <FontAwesomeIcon icon={faPlus} size="lg" />
               <span className="ms-2">Create Product</span>
            </Button>
         </div>
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
