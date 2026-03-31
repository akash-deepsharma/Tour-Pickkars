"use client"
import React, { useEffect, useState } from "react";

const Notes = ({note}) => {
  return (

    <div className="min_box-detail Age_limit container my-5 mt-24">
      <div className="title">
        <h6 className="text-start fw-bold mb-4 page-title">
          Notes
        </h6>
      </div>
      <div
        className="notes-data p-3"
        dangerouslySetInnerHTML={{ __html: note }}
      />
    </div>
  );  
};

export default Notes;
