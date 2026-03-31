import TestimonialPackageSection from "@/components/TestimonialSection/TestimonialPackageSection";
import AgeLimit from "@/components/TripDetail/AgeLimit";
import Batches from "@/components/TripDetail/Batches";
import BookNow from "@/components/TripDetail/BookNow";
import Dates from "@/components/TripDetail/Dates";
import DownloadPdf from "@/components/TripDetail/DownloadPdf";
import Exclusions from "@/components/TripDetail/Exclusions";
import Faq from "@/components/TripDetail/Faq";
import Gallery from "@/components/TripDetail/Gallery";
import Inclusions from "@/components/TripDetail/Inclusions";
import Instavideo from "@/components/TripDetail/Instavideo";
import Itinerary from "@/components/TripDetail/Itinerary";
import Notes from "@/components/TripDetail/Notes";
import Overview from "@/components/TripDetail/Overview";
import OverviewCont from "@/components/TripDetail/OverviewCont";
import RelatedBlogs from "@/components/TripDetail/RelatedBlogs";
import RelatedTrips from "@/components/TripDetail/RelatedTrips";
import RelatedYoutube from "@/components/TripDetail/RelatedYoutube";
import ThingsToPack from "@/components/TripDetail/ThingsToPack";
import TripHero from "@/components/TripDetail/TripHero";
import TripInfo from "@/components/TripDetail/TripInfo";
import { packageRedirection, singlePackage } from "@/services/packageApi";
import { singleTrips } from "@/services/tripsApi";
import { notFound } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { cache } from "react";

const getSinglePackage = cache(async (slug) => {
  return await singlePackage(slug);
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const single_package = await getSinglePackage(slug);

  return {
    title: single_package.meta_title,
    description: single_package.meta_description,
    keywords: single_package.meta_description,
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
      title: single_package.meta_title,
      description: single_package.meta_description,
      images: [{ url: single_package.banner }],
    },
    twitter: {
      card: "summary_large_image",
      title: single_package.meta_title,
      description: single_package.meta_description,
      images: [single_package.banner],
    },
  };
}

export default async function Tripdetail({ params }) {
  const { slug } = await params;
  const single_package = await getSinglePackage(slug);

  if (!single_package) return notFound();
  const trips = await singleTrips(single_package.trip.slug);
  const redirection = await packageRedirection(single_package.slug);

  if (redirection.hasOwnProperty("id")) {
    if (redirection.to_type == "trip") {
      return permanentRedirect(`/trips/${redirection.to_url}`);
    } else {
      permanentRedirect(`/${redirection.to_url}`);
    }
  }
  console.log("singlePackage asdj", single_package)
  return (
    <>
      {single_package.addon_schema.map((schema) => (
        <script
          key={schema.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema.schema }}
        />
      ))}
      <TripHero
        title={single_package.title}
        duration={single_package.duration}
        starting_price={single_package.starting_price}
        pickup={single_package.pickup}
        drop={single_package.drop}
        banner={single_package?.banner}
      />
      <div className="container th-container">
        <div className="row orderchage-formob">
          <div className="col-xxl-8 col-lg-8 position-relative z-3">
            <TripInfo
              pickup={single_package.pickup}
              drop={single_package.drop}
              duration={single_package.duration}
              trip={single_package.trip.heading}
              completedata={single_package}
            />
            {single_package.package_dates.length > 0 && (
              <Dates
                active_costs={single_package.active_costs}
                package_dates={single_package.package_dates}
              />
            )}

            {/* <TripBanner /> */}
            <OverviewCont />
            <div id="Overview">
              <Overview
                description={single_package.description}
                itinerary_pdf={single_package.itinerary_pdf}
              />
            </div>
            <AgeLimit />
            {single_package.gallery.length > 0 && (
              <Gallery gallery={single_package.gallery} />
            )}
            <div id="Itinerary">
              <Itinerary itinerary={single_package.itinerary} />
            </div>
            <div id="Inclusions">
              <Inclusions inclusion={single_package.inclusion} />
            </div>
            <div id="Exclusions">
              <Exclusions exclusion={single_package.exclusion} />
            </div>
            <div id="ThingsToPack">
              <ThingsToPack things_to_pack={single_package.things_to_pack} />
            </div>
            <Notes note={single_package.note} />
            {single_package.faqs.length > 0 && (
              <Faq faqs={single_package.faqs} />
            )}
          </div>
          <div className="col-xxl-4 col-lg-4 mb-4">
            <div
              className="position-sticky"
              style={{ top: "150px", zIndex: "1" }}
            >
              <BookNow
                id={single_package.id}
                slug={single_package.slug}
                starting_price={single_package.starting_price}
                bookingButton={
                  single_package.package_dates.length > 0 &&
                    single_package.active_costs.length > 0
                    ? true
                    : false
                }
              />
              <Batches
                package_dates={single_package.package_dates}
                pickup={single_package.pickup}
                drop={single_package.drop}
              />
              <DownloadPdf
                id={single_package.id}
                itinerary_pdf={single_package.itinerary_pdf}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <MiddleContent /> */}
      {single_package.related_youtube_video && single_package.related_youtube_video.length > 0 && (
        <RelatedYoutube
          related_youtube_video={single_package.related_youtube_video}
        />
      )}
      {single_package.related_insta_video && single_package.related_insta_video.length > 0 && (
        <Instavideo related_insta_video={single_package.related_insta_video} />
      )}
      {single_package.testimonials.length > 0 && (
        <TestimonialPackageSection testimonials={single_package.testimonials} />
      )}

      <RelatedBlogs
        title={single_package.title}
        destination={single_package.destination.name}
        trip={single_package.trip.heading}
      />

      <RelatedTrips trips={trips.packages} />
    </>
  );
}
