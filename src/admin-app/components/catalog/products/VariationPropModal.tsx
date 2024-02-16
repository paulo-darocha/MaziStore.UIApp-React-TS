import { Button, Modal, ModalBody } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { T_ProductVariationVm, T_ProductVm } from "../../../admin-types/CatalogAdmTypes";
import {
   ChangeEvent,
   Dispatch,
   FC,
   SetStateAction,
   useEffect,
   useState,
} from "react";
import { getImage } from "../../../../webApis/CoreWebApi";

type T_Props = {
   setShow: Dispatch<SetStateAction<boolean>>;
   variation: T_ProductVariationVm;
};

const VariationPropModal: FC<T_Props> = ({ setShow, variation }) => {
   const [thumbnailImg, setThumbnailImg] = useState<Blob | undefined>();
   const [images, setImages] = useState<Blob[] | undefined>();

   const { register } = useForm<T_ProductVm>({ defaultValues: variation });

   useEffect(() => {
      if (variation) {
         getImage(variation.thumbnailImageUrl).then((res) =>
            setThumbnailImg(res)
         );
         const getImages = async () => {
            const images = variation.imageUrls.map((img) => getImage(img));
            return Promise.all(images);
         };

         getImages().then((res) => setImages(res));
      }
   }, [variation]);

   const onChangeImageInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files[0];
         if (images && images.length > 0) setImages([...images, file]);
         else setImages([file]);
      }
   };

   return (
      <ModalBody>
         <Modal.Header closeButton>
            <h5>Change Properties for new Variation</h5>
         </Modal.Header>
         <form>
            <p className="text-success">
               modify only properties you want to change
            </p>
            {/* SKU */}
            <div className="row">
               <label className="col-3 col-form-label h6">SKU</label>
               <label className="col-3 col-form-label h6">GTIN</label>
               <label className="col-3 col-form-label h6">Price</label>
               <label className="col-3 col-form-label h6">Old Price</label>
            </div>

            <div className="row">
               <div className="col-3">
                  <input
                     type="text"
                     className="form-control"
                     {...register("sku")}
                  />
               </div>
               <div className="col-3">
                  <input
                     type="text"
                     className="form-control"
                     {...register("gtin")}
                  />
               </div>
               <div className="col-3">
                  <input
                     type="text"
                     className="form-control"
                     {...register("price")}
                  />
               </div>
               <div className="col-3">
                  <input
                     type="text"
                     className="form-control"
                     {...register("oldPrice")}
                  />
               </div>
            </div>
            <hr />
            <div className="row">
               <div className="col-7">
                  <label className="col-form-label h6">Thumbnail</label>
                  <input
                     className="ms-2 form-control"
                     type="file"
                     accept="image/*"
                  />
               </div>
               {thumbnailImg && (
                  <div className="col-5 text-center">
                     <img
                        src={URL.createObjectURL(thumbnailImg)}
                        className="w-75 text-end"
                     />
                  </div>
               )}
            </div>

            <hr />

            <div className="row mt-3">
               <label className="col-2 col-form-label h6">Images</label>
               <div className="col-10">
                  <input
                     type="file"
                     accept="images/*"
                     className="ms-2 form-control"
                     onChange={onChangeImageInput}
                  />
               </div>
               <div className="row mt-1">
                  {images &&
                     images.map((x) => (
                        <div className="col-3 text-center">
                           <img
                              src={URL.createObjectURL(x)}
                              className="w-100 text-end"
                           />
                        </div>
                     ))}
               </div>
            </div>
            <div className="row my-3">
               <div className="offset-7 col-2">
                  <Button>Save</Button>
               </div>
               <div className="col-2">
                  <Button
                     variant="outline-secondary"
                     onClick={() => setShow(false)}
                  >
                     Cancel
                  </Button>
               </div>
            </div>
         </form>
      </ModalBody>
   );
};

export default VariationPropModal;
