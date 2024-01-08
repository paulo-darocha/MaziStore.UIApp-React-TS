import { FC, useEffect, useState } from "react";
import { T_WidgetInstanceViewModel } from "../../types/CoreTypes";
import { getCarouselData } from "../../webApis/CmsWebApi";
import {
   T_CarouselWidgetItemVm,
   T_CarouselWidgetVm,
} from "../../types/CmsTypes";
import { Carousel, Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import { useNavigate } from "react-router-dom";

type T_Props = { instance: T_WidgetInstanceViewModel };

const CarouselWidget: FC<T_Props> = ({ instance }) => {
   const navigate = useNavigate();
   const [dev, setDev] = useState(false);
   const [carouselData, setCarouselData] = useState<T_CarouselWidgetVm | null>(
      null
   );
   const [images, setImages] = useState<Blob[] | null>(null);

   useEffect(() => {
      getCarouselData(instance).then((res) => setCarouselData(res));
   }, [instance]);

   useEffect(() => {
      if (carouselData && carouselData.items.length > 0) {
         const getImagesForCarousel = async () => {
            const images = carouselData.items.map(
               (item: T_CarouselWidgetItemVm) => getImage(item.image)
            );
            return Promise.all(images);
         };

         getImagesForCarousel().then((res) => setImages(res));
      }
   }, [carouselData]);

   return (
      <>
         <div>
            <div
               className="row"
               style={{ fontSize: "9px", cursor: "pointer" }}
               onClick={() => setDev(true)}
            >
               [ CasouselWidget - JSON ]
            </div>
            <div className="container-sm">
               <div>
                  {carouselData && images && (
                     <Carousel interval={2000} style={{ cursor: "pointer" }}>
                        {carouselData.items.map(
                           (item: T_CarouselWidgetItemVm, i: number) => (
                              <Carousel.Item
                                 key={item.caption}
                                 onClick={() =>
                                    navigate(`/category${item.targetUrl}`)
                                 }
                              >
                                 <img
                                    src={URL.createObjectURL(images[i])}
                                    className="w-100"
                                 />
                                 <Carousel.Caption>
                                    <h3>{item.caption}</h3>
                                    <h5>{item.subCaption}</h5>
                                 </Carousel.Caption>
                              </Carousel.Item>
                           )
                        )}
                     </Carousel>
                  )}
               </div>
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CarouselWidget.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(carouselData, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default CarouselWidget;
