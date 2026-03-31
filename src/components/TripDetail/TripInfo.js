"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faFastBackward,
  faMapMarkedAlt,
  faStar as faSolidStar,
  faShare,
  faStarHalfAlt,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faShareFromSquare,
  faStar,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import ShareButton from "./ShareButton";

export default function TripInfo({pickup,drop,duration,trip,completedata}) {
  // console.log(" completedata ", completedata)
  return (
    <div className="min_box-detail Age_limit container my-6 mt-80">
      <div className="">
        {/* Title + Ratings + Share */}
        <div className="Title_Ratings  d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="page-title">{trip}</h2>
            <div className=" star-vew d-flex align-items-center gap-2 mt-2 d-none">
              {/* Stars */}
              <div className="tour-rating">
                <div
                  className="star-rating"
                  role="img"
                  aria-label={`Rated ${5} out of 5`}
                >
                  {/* Rating */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fullStars = Math.floor(3.5);
                    const hasHalfStar = 3.5 % 1 !== 0;

                    if (i < fullStars) {
                      return (
                        <FontAwesomeIcon
                          key={i}
                          icon={faSolidStar}
                          style={{ color: "#FFA944" }}
                        />
                      );
                    } else if (i === fullStars && hasHalfStar) {
                      return (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStarHalfStroke}
                          style={{ color: "#FFA944" }}
                        />
                      );
                    } else {
                      return (
                        <FontAwesomeIcon
                          key={i}
                          icon={faRegularStar}
                          style={{ color: "#FFA944" }}
                        />
                      );
                    }
                  })}
                </div>
              </div>
              <span className="deivn-asd">(8700+ Reviews)</span>
            </div>
          </div>
          {/* <button className=" share_btn d-flex align-items-center gap-2  bg-white px-4 transition">
            <FontAwesomeIcon icon={faShareFromSquare} />
            Share
          </button> */}
           <ShareButton 
            packageLink={completedata?.slug}
            packageName={trip}
      />
        </div>
        <hr className="my-4" />
        {/* Details Section */}
        <div className="detail-section">
          <h5 className="page-title">Details</h5>
          <div className="row  gap-4 mb-6">
            <div className="jtym col-auto col-xl-4 col-lg-5 col-md-5 d-flex align-items-center gap-3 py-2 px-4">
              <img src="/img/icon/Delhi-to-Delhi.svg" />
              <div className="deta_content">
                <p className="asdcasd text-sm text-gray-500 mb-0">
                  Pickup & Drop
                </p>
                <p className="sadasd font-semibold text-gray-700">
                  {pickup} to {drop}
                </p>
              </div>
            </div>

          

            <div className="jtym col-auto col-xl-4 col-lg-5 col-md-5 d-flex align-items-center gap-3 py-2 px-4 ">
              <img src="/img/icon/9Days.svg" />
              <div className="deta_content">
                <p className="asdcasd ">Duration</p>
                <p className="sadasd ">{duration}</p>
              </div>
            </div>

{/* 
              <div className="jtym col-auto d-flex align-items-center gap-3 py-2 px-4 ">
              <img src="/img/icon/Backpacking-Trips.svg" />

              <div className="deta_content">
                <p className="asdcasd text-sm text-gray-500">Category</p>
                <p className="sadasd font-semibold text-gray-700">
                  {pickup}
                </p>
              </div>
            </div> */}
            
          </div>
        </div>

        <hr className="my-4" />
        {/* Details Section */}
        <div className="detail-section">
            {/* <h5 className="page-title">Details</h5> */}
        <div className="row  gap-4 mb-6">
          <div className="jtym col-auto d-flex align-items-center gap-3 py-2 px-4">
            <img src="/img/icon/Meals.svg"/>
            <div className="deta_content">
              <p className="sadasd">Meals</p>
            </div>
          </div>

          <div className="jtym col-auto d-flex align-items-center gap-3 py-2 px-4 ">
            <img src="/img/icon/Stays.svg"/>

            <div className="deta_content">
              <p className="sadasd">Stays</p>
            </div>
          </div>

          <div className="jtym col-auto d-flex align-items-center gap-3 py-2 px-4 ">
            <img src="/img/icon/Transfers.svg"/>
            <div className="deta_content">
              <p className="sadasd ">Transfers</p>
            </div>
          </div>
          <div className="jtym col-auto d-flex align-items-center gap-3 py-2 px-4 ">
            <img src="/img/icon/Activities.svg"/>
            <div className="deta_content">
              <p className="sadasd ">Activities</p>
            </div>
          </div>
        </div>
        </div> 
      </div>
    </div>
  );
}
