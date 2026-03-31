"use client";
import React, { useState } from "react";

export default function Itinerary({ itinerary }) {
  // state to manage active tab
  const [activeTab, setActiveTab] = useState(0);  
  return (
    <div className="min_box-detail Age_limit container my-4">
      <div className="title">
        <h6 className="text-start fw-bold mb-4 page-title">Itinerary</h6>
      </div>

      <div className="tour-page-single mt-3">
        <div className="page-content">
          {/* Tab headers */}
          <ul className="nav nav-tabs tour-tab mt-3" role="tablist">
            {itinerary.map((item, index) => (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`nav-link ${activeTab === index ? "active" : ""}`}
                  type="button"
                  role="tab"
                  onClick={() => setActiveTab(index)}
                >
                  Day {index + 1}
                </button>
              </li>
            ))}
          </ul>

          {/* Tab content */}
          <div className="tab-content mt-3">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className={`tab-pane fade ${
                  activeTab === index ? "show active" : ""
                }`}
                role="tabpanel"
              >
                <h6 className="text-start fw-bold mb-4 page-title">
                  {item.heading}
                </h6>
                <div className="tour-grid-plan">
                  <div className="checklist">
                    <div
                      id="ItineraryContent"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
