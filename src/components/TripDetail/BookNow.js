"use client";
import React, { useState } from "react";
import RequestCallback from "../HelpingCompnents/RequestCallback";

export default function BookNow({ id, slug, starting_price, bookingButton }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min_box-detail uiymyumyumyum Age_limit container my-6 mt-80">
      {/* <!-- Title --> */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-semibold text-secondary">
          Starting From
          <i className="bi bi-info-circle ms-1"></i>
          {/* <!-- Price --> */}
          <h3 className="fw-bold text-primary mb-4">
            ₹ {Number(starting_price)}/-
          </h3>
        </span>
        <span className=" bg-light text-dark rounded-pill px-3 py-2">
          Per Person
        </span>
      </div>

      {/* <!-- Button --> */}
      <div className="d-flex align-items-center justify-content-between  gap-4">
        {bookingButton && (
          <a
            href={`/booking/${slug}`}
            className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
          >
            {" "}
            Book Now{" "}
          </a>
        )}
        <button
          className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
          onClick={() => setOpen(id)}
        >
          Send Inquiry
        </button>
      </div>
      {open && <RequestCallback open={open} setOpen={setOpen} />}
    </div>
  );
}
