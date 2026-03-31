"use client";
import React, { useState, useEffect } from "react";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertMyDate } from "@/functions/dateFunction";

function Dates({ active_costs, package_dates }) {
  const [specialDates, setSpecialDates] = useState([]);

  useEffect(() => {
    // console.log(package_dates);
    setSpecialDates(package_dates.filter((item) => item.special == 1));
  }, []);

  return (
    <div className="min_box-detail Age_limit container my-6 mt-24">
      <div className="dates-section container my-5">
        {/* Regular Dates */}
        <h3 className="section-title d-flex align-items-center border-bottom pb-2 mb-4">
          <img
            src="/img/icon/regular_date.png"
            alt="Regular Date"
            className="me-2"
          />
          Regular Date
        </h3>
        <div className="row justify-content-center">
          <div className="col-12 mb-4">
            <div className="row g-4">
              {active_costs.map((activity, idx) => (
                <div key={idx} className="col-auto">
                  <div className="activity-card shadow-sm">
                    <h3 className="activity-title">{activity.activity}</h3>
                    <p className="activity-cost">
                      <FontAwesomeIcon icon={faIndianRupee} />{" "}
                      <span className="text-decoration-line-through text-body-secondary">
                        {Number(activity.cost)}
                      </span>{" "}
                      {Number(activity.total_with_discount)} +{" "}
                      {Number(activity.gst_percent)}% GST
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Dates */}
        {specialDates.length != 0 ? (
          <>
            <h3 className="section-title d-flex align-items-center border-bottom pb-2 mb-4 mt-5">
              <img
                src="/img/icon/party_emoji.png"
                alt="Special Dates"
                className="me-2"
              />
              Special Dates
            </h3>
            <div className="row justify-content-center">
              {specialDates.map((item) => (
                <div className="col-12 mb-5" key={item.id}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="date-range">
                      {convertMyDate(item.start_date)} -{" "}
                      {convertMyDate(item.end_date)}
                    </p>
                    {/* <span className="festival-tag">New Year</span> */}
                  </div>
                  <div className="row g-4">
                    {active_costs.map((activity, idx) => (
                      <div key={idx} className="col-auto">
                        <div className="activity-card shadow-sm">
                          <h3 className="activity-title">
                            {activity.activity}
                          </h3>
                          {Number(item.increase_amount_by_percent) > 0 ? (
                            <p className="activity-cost">
                              <FontAwesomeIcon icon={faIndianRupee} />
                              {Number(activity.total_with_discount) + (Number(activity.total_with_discount) * Number(item.increase_amount_by_percent) / 100)} +{" "} 
                              {Number(activity.gst_percent)}% GST
                            </p>
                          ) : Number(activity.decrease_amount_by_percent) >
                            0 ? (
                            <p className="activity-cost">
                              <FontAwesomeIcon icon={faIndianRupee} />
                              {Number(activity.total_with_discount) - (Number(activity.total_with_discount) * Number(item.decrease_amount_by_percent) / 100)} +{" "} 
                              {Number(activity.gst_percent)}% GST
                            </p>
                          ) : (
                            <p className="activity-cost">
                              <FontAwesomeIcon icon={faIndianRupee} />
                              {Number(activity.total_with_discount)} +{" "}
                              {Number(activity.gst_percent)}% GST
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dates;
