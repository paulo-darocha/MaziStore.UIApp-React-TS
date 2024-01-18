import { FC, useState } from "react";
import { T_ProductVm } from "../../types/CatalogAdmTypes";
import { useForm } from "react-hook-form";
import TinyMCEEditor from "../../adm-home/TinyMCEEditor";
import { Modal } from "react-bootstrap";

type T_Props = { product: T_ProductVm };

const ProdEditGeneral: FC<T_Props> = ({ product }) => {
   const [dev, setDev] = useState(false);

   const { register, resetField, getValues } = useForm<T_ProductVm>({
      defaultValues: product,
   });

   const getShortDescription = (value: string) => {
      resetField("shortDescription", { defaultValue: value });
   };

   const getDescription = (value: string) => {
      resetField("description", { defaultValue: value });
   };

   const getSpecification = (value: string) => {
      resetField("specification", { defaultValue: value });
   };

   return (
      <>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: GeneralInformation.tsx [JSON]
         </div>
         <div className="text-center h5 m-3">
            General Information: "{product.name}"
         </div>
         <form>
            <input type="hidden" {...register("shortDescription")} />
            <input type="hidden" {...register("description")} />
            <input type="hidden" {...register("specification")} />

            {/* Name */}
            <div className="container-fluid text-sm-end">
               <div className="row mt-3">
                  <label className="col-sm-2 col-form-label h6">Name</label>
                  <div className="col-sm-10">
                     <input {...register("name")} className="form-control" />
                  </div>
               </div>

               {/* Slug  */}
               <div className="row mt-3">
                  <label className="col-sm-2 col-form-label h6">Slug</label>
                  <div className="col-sm-10">
                     <input {...register("slug")} className="form-control" />
                  </div>
               </div>

               {/* Brand  */}
               <div className="row mt-3">
                  <label className="col-sm-2 col-form-label h6">Brand</label>
                  <div className="col-sm-10">
                     <input {...register("brandId")} className="form-control" />
                  </div>
               </div>

               {/* Short Description */}
               <div className="row mt-4">
                  <label className="col-sm-2 col-form-label h6">
                     Short Description
                  </label>
                  <div className="col-sm-10">
                     <TinyMCEEditor
                        getValue={getShortDescription}
                        initialValue={product?.shortDescription || ""}
                     />
                  </div>
               </div>

               {/* Description */}
               <div className="row mt-4">
                  <label className="col-sm-2 col-form-label h6">
                     Description
                  </label>
                  <div className="col-sm-10">
                     <TinyMCEEditor
                        getValue={getDescription}
                        initialValue={product?.description || ""}
                     />
                  </div>
               </div>

               {/* Specification */}
               <div className="row mt-4">
                  <label className="col-sm-2 col-form-label h6">
                     Specification
                  </label>
                  <div className="col-sm-10">
                     <TinyMCEEditor
                        getValue={getSpecification}
                        initialValue={product?.specification || ""}
                     />
                  </div>
               </div>

               {/* SKU */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">SKU</label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("sku")}
                     />
                  </div>
               </div>

               {/* GTIN  */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">GTIN</label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("gtin")}
                     />
                  </div>
               </div>

               {/* Price  */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">Price</label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("price")}
                     />
                  </div>
               </div>

               {/* OldPrice  */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">Old Price</label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("oldPrice")}
                     />
                  </div>
               </div>

               {/* Special Price Start */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">
                     Special Price Start
                  </label>
                  <div className="col-10">
                     <input
                        type="date"
                        className="form-control"
                        {...register("specialPriceStart")}
                     />
                  </div>
               </div>

               {/* Special Price End */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">
                     Special Price End
                  </label>
                  <div className="col-10">
                     <input
                        type="date"
                        className="form-control"
                        {...register("specialPriceEnd")}
                     />
                  </div>
               </div>

               {/* Enable Stock Tracking */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("stockTrackingIsEnabled")}
                     />
                     <label className="form-check-label h6 ms-2">
                        Enable Stock Tracking
                     </label>
                  </div>
               </div>

               {/* Tax Class */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">Tax Class</label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("taxClassId")}
                     />
                  </div>
               </div>
            </div>
         </form>

         <br />
         <br />
         <br />
         <br />

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetailPricing.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(getValues(), null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};
export default ProdEditGeneral;
