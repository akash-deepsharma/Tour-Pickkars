import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import UpcomingTripSection from "@/components/UpcomingTripSection/UpcomingTripSection";
import { getPagewithSection } from "@/services/pageSection";
import { tripsWithPackagecount } from "@/services/tripsApi";
import UpcomingTripMain from "@/components/UpcomingTripSection/UpcomingTripMain";

export default async function UpcomingTrips() {
  const mainpage = await getPagewithSection(4);
  const tripsWithcount = await tripsWithPackagecount();

  return (
    <>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_MEDIA_PATH +
            mainpage.sections[0].section[0].data.image
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">
              {mainpage.sections[0].section[1].data.Text}
            </h1>
            <ul className="breadcumb-menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>{mainpage.sections[0].section[1].data.Text}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container th-container space">
        <UpcomingTripMain tripsWithcount={tripsWithcount}/>
      </div>
    </>
  );
}
