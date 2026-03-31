import { getPagewithSection } from "@/services/pageSection";
import CurveSlider from "./CurveSlider";
import { homeTrips } from "@/services/tripsApi";
import "./TourCategories.css";

export default async function TourCategories() {
  const mainpage = await getPagewithSection(1, "categories");
  const trips = await homeTrips();
  return (
    <section
      className="category-area bg-top-center pt-8 pb-4"
      style={{ backgroundImage: "url(/img/bg/category_bg_1.png)" }}
    >
      <div className="container th-container">
        <div className="title-area text-center">
          <span className="sub-title">
            {mainpage.section[0].data.Text}
          </span>
          <h2 className="sec-title">{mainpage.section[1].data.Text}</h2>
        </div>

        <CurveSlider trips={trips} />

        <div className="slider-pagination mt-6 text-center"></div>
      </div>
    </section>
  );
}
