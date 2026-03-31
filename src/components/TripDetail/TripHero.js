"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
// import "./TripHero.css"; // custom styles

export default function TripHero({title, duration, starting_price, pickup, drop, banner}) {

  return (
    <>
      {/* Hero Section */}
      <div className="trip-hero position-relative">
        {/* Background Image */}
        <Image
          className="img-fluid w-100 trip-hero-img" width={1900} height={800}
          src={banner}
          alt={title}
        />

        {/* Overlay Content */}
        <div className="trip-hero-overlay position-absolute bottom-0 w-100">
            <div className="bg-dark bg-opacity-75 p-3 rounded text-white">
              <div className="container th-container">
                <div className="row align-items-center">
                {/* Title */}
                <div className=" col-lg-5 text-center text-lg-start mb-3 mb-lg-0">
                  <h1 className="h3 fw-bold mb-0 sec-title text-white">
                    {title} Package
                  </h1>
                </div>

                {/* Details */}
                <div className="col-lg-7 ">
                  <div className="row text-center justify-content-center">
                    {/* Duration */}
                    <div className="col-md-4  col">
                      <div className="icon-circle mb-2">
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                      <p className="small mb-1 fw-semibold text-white text-nowrap">Duration</p>
                      <p className="mb-0 text-white text-nowrap">
                        {duration}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="col-md-4 col">
                      <div className="icon-circle mb-2">
                        <FontAwesomeIcon icon={faRupeeSign} />
                      </div>
                      <p className="small mb-1 fw-semibold text-white text-nowrap">Starting Price</p>
                      <p className="mb-0 text-white text-nowrap">
                        ₹ {Number(starting_price)}/-
                      </p>
                    </div>

                    {/* Pickup & Drop */}
                    <div className="col-md-4 col">
                      <div className="icon-circle mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </div>
                      <p className="small mb-1 fw-semibold text-white text-nowrap">Pick-up & Drop</p>
                      <p className="mb-0 text-white text-nowrap">
                        {pickup} → {drop}
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Details */}
              </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
