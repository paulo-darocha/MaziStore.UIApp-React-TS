import { FC, useEffect, useState } from "react";
import { T_WidgetInstanceViewModel } from "../../types/CoreTypes";
import { getCarouselData } from "../../webApis/CmsWebApi";
import {
   T_CarouselWidgetItemVm,
   T_CarouselWidgetVm,
} from "../../types/CmsTypes";
import { Carousel } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";

type T_Props = { instance: T_WidgetInstanceViewModel };

const CarouselWidget: FC<T_Props> = ({ instance }) => {
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
            <div style={{ fontSize: "9px" }}>
               /src/components/cms/CarouselWidget.tsx
            </div>
            <div className="container-sm">
               <div>
                  {carouselData && images && (
                     <Carousel interval={2000}>
                        {carouselData.items.map(
                           (item: T_CarouselWidgetItemVm, i: number) => (
                              <Carousel.Item key={item.caption}>
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

         {/* <div className="small">
            <pre>{JSON.stringify(carouselData, null, 3)}</pre>
         </div> */}
      </>
   );
};

export default CarouselWidget;
