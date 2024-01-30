import { ChangeEvent, useEffect, useState } from "react";
import { T_ProductVm, T_ProductForm } from "../../admin-types/CatalogAdmTypes";
import { useForm } from "react-hook-form";
import TinyMCEEditor from "../../adm-home/TinyMCEEditor";
import { Button, Card, Modal } from "react-bootstrap";
import useBrandsHook from "../../admin-hooks/useBrandsHook";
import { T_BrandVm } from "../../admin-types/BrandTypes";
import useTaxHook from "../../admin-hooks/useTaxHook";
import { T_Tax } from "../../admin-types/TaxTypes";
import useProductsHook from "../../admin-hooks/useProductsHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getImage } from "../../../webApis/CoreWebApi";
import { useAppSelector } from "../../../redux-store/reduxStore";
import { useNavigate } from "react-router-dom";

const ProdEditGeneral = () => {
   const [dev, setDev] = useState(false);
   const [save, setSave] = useState(false);
   const [count, setCount] = useState(0);
   const [brands, setBrands] = useState<T_BrandVm[] | undefined>();
   const [taxes, setTaxes] = useState<T_Tax[] | undefined>();
   const [thumbnailImg, setThumbnailImg] = useState<Blob | undefined>();
   const [images, setImages] = useState<Blob[] | undefined>();

   const product = useAppSelector((x) => x.editingProduct);
   const { getBrandsRepo } = useBrandsHook();
   const { getTaxesRepo } = useTaxHook();
   const { sendNewProductRepo } = useProductsHook();
   const navigate = useNavigate();

   const { register, reset, resetField, handleSubmit } = useForm<T_ProductVm>({
      defaultValues: product,
   });

   useEffect(() => {
      getBrandsRepo().then((res) => setBrands(res));
      getTaxesRepo().then((res) => setTaxes(res));
      if (product && product?.id != 0) {
         getImage(product.thumbnailImageUrl).then((res) =>
            setThumbnailImg(res)
         );
         reset(product);
      }

      return () => setSave(false);
   }, [product]);

   const getShortDescription = (value: string) => {
      resetField("shortDescription", { defaultValue: value });
   };
   const getDescription = (value: string) => {
      resetField("description", { defaultValue: value });
   };
   const getSpecification = (value: string) => {
      resetField("specification", { defaultValue: value });
   };
   const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length != 0) {
         setThumbnailImg(e.target.files[0]);
      }
   };

   const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length != 0) {
         const localImgs = images || [];
         localImgs.push(e.target.files[0]);
         setImages(localImgs);
         setCount(count + 1);
      }
   };

   const onSubmitMainForm = (data: T_ProductVm) => {
      const form: T_ProductForm = { product: data };
      if (thumbnailImg) form.thumbnailImage = thumbnailImg;
      if (images) form.productImages = images;
      sendNewProductRepo(form).then(() => navigate("../part2"));
   };

   const onClickRemoveImage = (i: number) => {
      if (images) {
         const localImgs = images;
         localImgs?.splice(i, 1);
         setImages(localImgs);
         setCount(count - 1);
      }
   };

   return (
      <>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: EditGeneralInformation.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>
         <div className="text-center h5 m-3">
            General Information: "{product?.name ?? "(new product)"}"
            <Button
               className="ms-3"
               variant="outline-dark"
               size="sm"
               onClick={() => setSave(true)}
            >
               <span className="h5">{">>"}</span>
            </Button>
         </div>

         <form id="myForm" onSubmit={handleSubmit(onSubmitMainForm)}>
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
                     <select {...register("brandId")} className="form-control">
                        {brands &&
                           brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                 {brand.name}
                              </option>
                           ))}
                     </select>
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

               {/* Special Price  */}
               <div className="row mt-4">
                  <label className="col-2 col-form-label h6">
                     Special Price
                  </label>
                  <div className="col-10">
                     <input
                        type="text"
                        className="form-control"
                        {...register("specialPrice")}
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
               <div className="row mt-3">
                  <label className="col-sm-2 col-form-label h6">
                     Tax Class
                  </label>
                  <div className="col-sm-10">
                     <select
                        {...register("taxClassId")}
                        className="form-control"
                     >
                        {taxes &&
                           taxes.map((tax) => (
                              <option key={tax.id} value={tax.id}>
                                 {tax.name}
                              </option>
                           ))}
                     </select>
                  </div>
               </div>

               {/* Product Thumbnail */}
               <div className="row mt-4">
                  <label className="col-sm-2 col-form-label h6">
                     Thumbnail
                  </label>
                  <div className="col-sm-10 text-start">
                     <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        {...register("thumbnailImageUrl")}
                        onChange={onChangeThumbnail}
                     />
                     {thumbnailImg && (
                        <img
                           src={URL.createObjectURL(thumbnailImg)}
                           style={{ maxWidth: "50vh" }}
                        />
                     )}
                  </div>
               </div>

               {/* Product Images */}
               <div className="row mt-4">
                  <label className="col-sm-2 col-form-label h6">Images</label>
                  <div className="col-sm-10 text-start">
                     <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        {...register("thumbnailImageUrl")}
                        onChange={onChangeImage}
                        disabled={count >= 4}
                     />
                     {}
                     {count} images selecionada{count > 1 ? "s" : ""}
                     <div className="row">
                        {images &&
                           images.map((img, i) => (
                              <div className="col-6 col-sm-4 col-md-3">
                                 <Card>
                                    <Card.Img src={URL.createObjectURL(img)} />
                                    <Card.ImgOverlay className="text-end">
                                       <Card.Text>
                                          <FontAwesomeIcon
                                             style={{ cursor: "pointer" }}
                                             color="black"
                                             size="lg"
                                             icon={faX}
                                             onClick={() =>
                                                onClickRemoveImage(i)
                                             }
                                          />
                                       </Card.Text>
                                    </Card.ImgOverlay>
                                 </Card>
                              </div>
                           ))}
                     </div>
                  </div>
               </div>

               {/* Is Featured */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("isFeatured")}
                     />
                     <label className="form-check-label h6 ms-2">
                        Is Featured
                     </label>
                  </div>
               </div>

               {/* Is Published */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("isPublished")}
                        defaultChecked
                     />
                     <label className="form-check-label h6 ms-2">
                        Is Published
                     </label>
                  </div>
               </div>

               {/* Is Called For Pricing */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("isCallForPricing")}
                     />
                     <label className="form-check-label h6 ms-2">
                        Is Called For Pricing
                     </label>
                  </div>
               </div>

               {/* Is Allowed To Order */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("isAllowToOrder")}
                        defaultChecked
                     />
                     <label className="form-check-label h6 ms-2">
                        Is Allowed To Order
                     </label>
                  </div>
               </div>

               <Button type="submit">Ok</Button>
            </div>

            <Modal show={save} onHide={() => setSave(false)}>
               <Modal.Body>
                  <Modal.Header closeButton>
                     <h5>Save Changes in this Tab?</h5>
                  </Modal.Header>
                  <div className="text-center my-5">
                     <Button className="m-3" form="myForm" type="submit">
                        Save and Go
                     </Button>
                     <Button
                        variant="warning"
                        className="m-3"
                        onClick={() => {
                           navigate("../part2");
                        }}
                     >
                        Don't Save and Go
                     </Button>
                     <Button
                        variant="secondary"
                        className="m-3"
                        onClick={() => setSave(false)}
                     >
                        Cancel
                     </Button>
                  </div>
               </Modal.Body>
            </Modal>
         </form>

         <br />
         <br />
         <br />
         <br />

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  EditGeneralInformation.tsx
               </Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(product, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ProdEditGeneral;
