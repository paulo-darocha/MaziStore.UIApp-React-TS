import { FC, useEffect, useState } from "react";
import useCategoriesApi from "../../../admin-hooks/useCategoriesApi";
import {
   T_SmartTableParam,
   T_SmartTableResult,
} from "../../../admin-types/UserTypes";
import { Button, Modal } from "react-bootstrap";
import { T_ProductInCategory } from "../../../admin-types/CategoryAdmTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCheck,
   faEdit,
   faExclamationTriangle,
   faX,
} from "@fortawesome/free-solid-svg-icons";

type T_Props = { categoryId: number };

const ProductsInCategory: FC<T_Props> = ({ categoryId }) => {
   const [dev, setDev] = useState(false);
   const [inConstruction, setInConstruction] = useState(false);
   const [products, setProducts] =
      useState<T_SmartTableResult<T_ProductInCategory>>();

   const { getProductsInCategoryRepo } = useCategoriesApi();

   useEffect(() => {
      if (categoryId && categoryId > 0) {
         const data: T_SmartTableParam = {
            pagination: {
               start: 0,
               totalItemCount: 0,
               number: 0,
               numberOfPages: 0,
            },
            search: {},
            sort: {},
         };
         getProductsInCategoryRepo(data, categoryId).then((res) =>
            setProducts(res)
         );
      }
   }, [categoryId]);

   const getIcon = (state: boolean) => {
      if (state) return <FontAwesomeIcon icon={faCheck} color="green" />;
      else return <FontAwesomeIcon icon={faX} size="xs" color="red" />;
   };

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: ProductsInCategory.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <div>ProductsInCategory</div>

         {products && products.items.length > 0 ? (
            <table className="table text-center">
               <thead>
                  <tr>
                     <th className="text-start">Name</th>
                     <th>Published?</th>
                     <th>Featured in Category?</th>
                     <th>Display Order</th>
                     <th>Edit</th>
                  </tr>
               </thead>
               <tbody>
                  {products &&
                     products.items.length > 0 &&
                     products.items.map((item) => (
                        <tr>
                           <td className="text-start">{item.productName}</td>
                           <td>{getIcon(item.isProductPublished)}</td>
                           <td>{getIcon(item.isFeaturedProduct)}</td>
                           <td>{item.displayOrder}</td>
                           <td>
                              <Button
                                 variant="outline-primary"
                                 size="sm"
                                 onClick={() => setInConstruction(true)}
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </Button>
                           </td>
                        </tr>
                     ))}
               </tbody>
            </table>
         ) : (
            <>
               <div className="text-center m-4 h4 text-success">
                  No products in this category yet.
               </div>
               <div className="text-center m-2 text-success">
                  To add a product to this category: <br /> go to the product
                  then choose "Product Category" option
               </div>
            </>
         )}

         <br />
         <br />
         <br />

         <Modal show={inConstruction} onHide={() => setInConstruction(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  <FontAwesomeIcon
                     icon={faExclamationTriangle}
                     size="2x"
                     className="me-5"
                     color="orange"
                  />
                  ProductsInCategory.tsx
               </Modal.Header>
               <div className="row text-center">
                  <h5 className="p-4">
                     This feature is under construction. Thanks for your
                     pacience.
                  </h5>
               </div>
            </Modal.Body>
         </Modal>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductsInCategory.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(products, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductsInCategory;
