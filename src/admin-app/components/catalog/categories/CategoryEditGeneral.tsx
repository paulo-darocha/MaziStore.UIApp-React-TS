import { useForm } from "react-hook-form";
import { T_CategoryForm } from "../../../admin-types/CategoryAdmTypes";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { getImage } from "../../../../webApis/CoreWebApi";
import useCategoriesApi from "../../../admin-hooks/useCategoriesApi";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type T_Props = { category?: T_CategoryForm };

const CategoryEditGeneral: FC<T_Props> = ({ category }) => {
   const [dev, setDev] = useState(false);
   const [thumbnailImage, setThumbnailImage] = useState<Blob | undefined>();
   const { postNewCategoryRepo, updateCategoryRepo } = useCategoriesApi();
   const navigate = useNavigate();

   const { register, handleSubmit } = useForm({ defaultValues: category });

   const onSubmitForm = (data: T_CategoryForm) => {
      if (thumbnailImage) data = { ...data, thumbnailImage: thumbnailImage };
      if (category) {
         updateCategoryRepo(data).then(() => {});
      } else {
         postNewCategoryRepo(data).then(() => {});
      }
   };

   const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length != 0) {
         setThumbnailImage(e.target.files[0]);
      }
   };

   useEffect(() => {
      if (category && category.thumbnailImageUrl) {
         getImage(category.thumbnailImageUrl).then((res) =>
            setThumbnailImage(res)
         );
      }
   }, [category]);

   return (
      <div className="container">
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: EditGeneralInformation.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <div>
            <strong className="h5">{category?.name}:</strong> Category Edit
            General{" "}
         </div>

         <form id="myForm" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="offset-1 col-10  text-sm-end">
               {/* NAME */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">Name</label>
                  <div className="col-sm-9">
                     <input {...register("name")} className="form-control" />
                  </div>
               </div>

               {/* SLUG  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">Slug</label>
                  <div className="col-sm-9">
                     <input {...register("slug")} className="form-control" />
                  </div>
               </div>

               {/* META TITLE  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Meta Title
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("metaTitle")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* META KEYWORDS  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Meta Keywords
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("metaKeywords")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* META DESCRIPTION  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Meta Description
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("metaDescription")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* PARENT CATEGORY  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Parent Category
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("parentId")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* DESCRIPTION  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Description
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("description")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* DISPLAY ORDER  */}
               <div className="row mt-3">
                  <label className="col-sm-3 col-form-label h6">
                     Display order
                  </label>
                  <div className="col-sm-9">
                     <input
                        {...register("displayOrder")}
                        className="form-control"
                     />
                  </div>
               </div>

               {/* Category Thumbnail */}
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
                     {thumbnailImage && (
                        <img
                           src={URL.createObjectURL(thumbnailImage)}
                           style={{ maxWidth: "30vh" }}
                        />
                     )}
                  </div>
               </div>

               {/* Enable Stock Tracking */}
               <div className="row mt-4 text-start">
                  <label className="col-2"></label>
                  <div className="col-10">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("includeInMenu")}
                     />
                     <label className="form-check-label h6 ms-2">
                        Enable Stock Tracking
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
                     />
                     <label className="form-check-label h6 ms-2">
                        Is Published
                     </label>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="offset-8 col-auto">
                  <Button type="submit" className="m-2">
                     Save
                  </Button>
                  <Button
                     variant="secondary"
                     className="m-2"
                     onClick={() => navigate("/admin/categories")}
                  >
                     Cancel
                  </Button>
               </div>
            </div>
         </form>

         <br />
         <br />
         <br />

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  EditGeneralInformation.tsx
               </Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(category, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CategoryEditGeneral;
