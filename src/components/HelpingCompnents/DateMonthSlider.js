// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


// export default function MonthDateSlider({ monthsData, handleDateFilter }) {
//   const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [currentDayIndex, setCurrentDayIndex] = useState(null);
//   const [visibleMonths, setVisibleMonths] = useState(2);
//   const scrollRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (selectedDate != null) {
//       handleDateFilter(selectedDate);
//     }
//   }, [selectedDate]);

//   useEffect(() => {
//     function handleResize() {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const boxWidth = 120; // assumed width of one month box in px
//         const fit = Math.floor(containerWidth / boxWidth);
//         setVisibleMonths(fit > 1 ? fit : 2); // always show at least 2
//       }
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handlePrev = () => {
//     if (currentMonthIndex === null) return;
//     if (currentDayIndex > 0) {
//       setCurrentDayIndex(currentDayIndex - 1);
//       setSelectedDate(null);
//       scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
//     } else if (currentMonthIndex > 0) {
//       const prevMonth = monthsData[currentMonthIndex - 1];
//       setCurrentMonthIndex(currentMonthIndex - 1);
//       setCurrentDayIndex(prevMonth.days.length - 1);
//       setSelectedDate(null);
//     }
//   };

//   const handleNext = () => {
//     if (currentMonthIndex === null) return;
//     const currentMonth = monthsData[currentMonthIndex];
//     if (currentDayIndex < currentMonth.days.length - 1) {
//       setCurrentDayIndex(currentDayIndex + 1);
//       setSelectedDate(null);
//       scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
//     } else if (currentMonthIndex < monthsData.length - 1) {
//       setCurrentMonthIndex(currentMonthIndex + 1);
//       setCurrentDayIndex(0);
//       setSelectedDate(null);
//     }
//   };

//   const currentMonth =
//     currentMonthIndex !== null ? monthsData[currentMonthIndex] : null;

//   return (
//     <div
//       className="d-flex align-items-center px-5 monthslider"
//       ref={containerRef}
//     >
//       {/* Left Arrow */}
//       <button
//         className="btn btn-link text-info fs-4 me-2 btn_before"
//         onClick={handlePrev}
//         disabled={
//           currentMonthIndex === null ||
//           (currentMonthIndex === 0 && currentDayIndex === 0)
//         }
//       >
//         <FontAwesomeIcon icon={faAngleLeft} />
//       </button>

//       <div className="px-4 d-flex align-items-center monthslider overflow-hidden">
//         {/* Previous Month */}
//         {currentMonthIndex !== null && currentMonthIndex > 0 && (
//           <div
//             className="border rounded padding-box me-2 cursor-pointer box-width"
//             onClick={() => {
//               setCurrentMonthIndex(currentMonthIndex - 1);
//               setCurrentDayIndex(null);
//               setSelectedDate(null);
//             }}
//           >
//             {monthsData[currentMonthIndex - 1].label}
//           </div>
//         )}

//         {/* Current Month */}
//         {currentMonth && (
//           <div className="bg-info text-white rounded padding-box">
//             {currentMonth.label}
//           </div>
//         )}

//         {/* Dates of current month */}
//         {currentMonth && (
//           <div ref={scrollRef} className="d-flex gap-2">
//             {currentMonth.days.map((d, idx) => (
//               <div
//                 key={idx}
//                 className={`text-center cursor-pointer secleded ${
//                   currentDayIndex === idx ? "fw-bold text-info" : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedDate(d.full_date);
//                   setCurrentDayIndex(idx);
//                 }}
//               >
//                 <div>{d.date}</div>
//                 <small className="text-muted">{d.day}</small>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upcoming Months */}
//         {monthsData
//           .slice(
//             currentMonthIndex !== null ? currentMonthIndex + 1 : 0,
//             currentMonthIndex !== null
//               ? currentMonthIndex + 1 + visibleMonths
//               : visibleMonths
//           )
//           .map((month, index) => (
//             <div
//               key={index}
//               className="border rounded padding-box ms-2 cursor-pointer box-width"
//               onClick={() => {
//                 setCurrentMonthIndex(
//                   currentMonthIndex !== null
//                     ? currentMonthIndex + index + 1
//                     : index
//                 );
//                 setCurrentDayIndex(null);
//                 setSelectedDate(null);
//               }}
//             >
//               {month.label}
//             </div>
//           ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         className="btn btn-link text-info fs-4 ms-2 btn_after"
//         onClick={handleNext}
//         disabled={
//           currentMonthIndex === null ||
//           (currentMonthIndex === monthsData.length - 1 &&
//             currentDayIndex === currentMonth?.days.length - 1)
//         }
//       >
//         <FontAwesomeIcon icon={faAngleRight} />
//       </button>
//     </div>
//   );
// }











"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function MonthDateSlider({ monthsData: unsortedMonthsData, handleDateFilter }) {
  // Get current date for filtering
  const getCurrentDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentDay = now.getDate();
    return { year: currentYear, month: currentMonth, day: currentDay };
  };

  // Sort months chronologically and filter out past months
  const monthsData = useMemo(() => {
    const monthOrder = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    };

    const currentDate = getCurrentDate();
    
    return [...unsortedMonthsData]
      .filter(month => {
        try {
          const [monthAbbr, yearStr] = month.label.split("-");
          const monthNum = monthOrder[monthAbbr] || 0;
          const yearNum = parseInt(`20${yearStr}`);
          
          // Filter out past months
          if (yearNum < currentDate.year) return false;
          if (yearNum === currentDate.year && monthNum < currentDate.month) return false;
          
          return true;
        } catch (error) {
          console.error("Error filtering months:", error);
          return true; // Keep month if there's an error parsing
        }
      })
      .sort((a, b) => {
        try {
          const [monthA, yearA] = a.label.split("-");
          const [monthB, yearB] = b.label.split("-");
          
          const fullYearA = parseInt(`20${yearA}`);
          const fullYearB = parseInt(`20${yearB}`);
          
          const monthNumA = monthOrder[monthA] || 0;
          const monthNumB = monthOrder[monthB] || 0;
          
          if (fullYearA !== fullYearB) {
            return fullYearA - fullYearB;
          }
          return monthNumA - monthNumB;
        } catch (error) {
          console.error("Error sorting months:", error);
          return 0;
        }
      });
  }, [unsortedMonthsData]);

  // Filter days in current month to show only today and future dates
  const getFilteredDays = (days) => {
    if (!days || !Array.isArray(days)) return [];
    
    const currentDate = getCurrentDate();
    const currentMonth = currentMonthIndex !== null ? monthsData[currentMonthIndex] : null;
    
    if (!currentMonth) return days;
    
    // Parse current month label to get month and year
    const [currentMonthAbbr, currentYearStr] = currentMonth.label.split("-");
    const monthOrder = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    };
    
    const currentDisplayMonth = monthOrder[currentMonthAbbr] || 0;
    const currentDisplayYear = parseInt(`20${currentYearStr}`);
    
    // If this is a future month/year, show all days
    if (currentDisplayYear > currentDate.year || 
        (currentDisplayYear === currentDate.year && currentDisplayMonth > currentDate.month)) {
      return days;
    }
    
    // If this is current month, filter days
    if (currentDisplayYear === currentDate.year && currentDisplayMonth === currentDate.month) {
      return days.filter(day => {
        const dayNum = parseInt(day.date);
        return dayNum >= currentDate.day;
      });
    }
    
    return days;
  };

  const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [visibleMonths, setVisibleMonths] = useState(2);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  // Set initial current month to the first available one (earliest future month)
  useEffect(() => {
    if (monthsData.length > 0 && currentMonthIndex === null) {
      setCurrentMonthIndex(0);
      // Reset day selection
      setCurrentDayIndex(null);
      setSelectedDate(null);
    }
  }, [monthsData, currentMonthIndex]);

  useEffect(() => {
    if (selectedDate != null) {
      handleDateFilter(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const boxWidth = 120; // assumed width of one month box in px
        const fit = Math.floor(containerWidth / boxWidth);
        setVisibleMonths(fit > 1 ? fit : 2); // always show at least 2
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (currentMonthIndex === null) return;
    
    const filteredDays = getFilteredDays(currentMonth?.days || []);
    
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      setSelectedDate(null);
      scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
    } else if (currentMonthIndex > 0) {
      const prevMonth = monthsData[currentMonthIndex - 1];
      const prevMonthFilteredDays = getFilteredDays(prevMonth.days);
      setCurrentMonthIndex(currentMonthIndex - 1);
      setCurrentDayIndex(prevMonthFilteredDays.length > 0 ? prevMonthFilteredDays.length - 1 : null);
      setSelectedDate(null);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex === null) return;
    
    const currentMonth = monthsData[currentMonthIndex];
    const filteredDays = getFilteredDays(currentMonth.days);
    
    if (currentDayIndex < filteredDays.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      setSelectedDate(null);
      scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
    } else if (currentMonthIndex < monthsData.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
      setCurrentDayIndex(0); // Start at first available day of next month
      setSelectedDate(null);
    }
  };

  const currentMonth = currentMonthIndex !== null ? monthsData[currentMonthIndex] : null;
  const filteredDays = currentMonth ? getFilteredDays(currentMonth.days) : [];

  // Auto-select first available day when month changes
  useEffect(() => {
    if (currentMonth && filteredDays.length > 0 && currentDayIndex === null) {
      setCurrentDayIndex(0);
    }
  }, [currentMonth, filteredDays, currentDayIndex]);

  return (
    <div
      className="d-flex align-items-center px-5 monthslider"
      ref={containerRef}
    >
      {/* Left Arrow - disabled if no previous month OR no previous day in current month */}
      <button
        className="btn btn-link text-info fs-4 me-2 btn_before"
        onClick={handlePrev}
        disabled={
          currentMonthIndex === null ||
          (currentMonthIndex === 0 && (currentDayIndex === null || currentDayIndex === 0))
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className="px-4 d-flex align-items-center monthslider overflow-hidden">
        {/* Previous Month - only show if exists */}
        {currentMonthIndex !== null && currentMonthIndex > 0 && (
          <div
            className="border rounded padding-box me-2 cursor-pointer box-width"
            onClick={() => {
              setCurrentMonthIndex(currentMonthIndex - 1);
              setCurrentDayIndex(null); // Will auto-select first available day
              setSelectedDate(null);
            }}
          >
            {monthsData[currentMonthIndex - 1].label}
          </div>
        )}

        {/* Current Month */}
        {currentMonth && (
          <div className="bg-info text-white rounded padding-box">
            {currentMonth.label}
          </div>
        )}

        {/* Dates of current month - only show filtered days */}
        {currentMonth && filteredDays.length > 0 && (
          <div ref={scrollRef} className="d-flex gap-2">
            {filteredDays.map((d, idx) => (
              <div
                key={idx}
                className={`text-center cursor-pointer secleded ${
                  currentDayIndex === idx ? "fw-bold text-info" : ""
                }`}
                onClick={() => {
                  setSelectedDate(d.full_date);
                  setCurrentDayIndex(idx);
                }}
              >
                <div>{d.date}</div>
                <small className="text-muted">{d.day}</small>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Months */}
        {monthsData
          .slice(
            currentMonthIndex !== null ? currentMonthIndex + 1 : 0,
            currentMonthIndex !== null
              ? currentMonthIndex + 1 + visibleMonths
              : visibleMonths
          )
          .map((month, index) => (
            <div
              key={index}
              className="border rounded padding-box ms-2 cursor-pointer box-width"
              onClick={() => {
                setCurrentMonthIndex(
                  currentMonthIndex !== null
                    ? currentMonthIndex + index + 1
                    : index
                );
                setCurrentDayIndex(null); // Will auto-select first available day
                setSelectedDate(null);
              }}
            >
              {month.label}
            </div>
          ))}
      </div>

      {/* Right Arrow - disabled if no next month OR no next day in current month */}
      <button
        className="btn btn-link text-info fs-4 ms-2 btn_after"
        onClick={handleNext}
        disabled={
          currentMonthIndex === null ||
          (currentMonthIndex === monthsData.length - 1 &&
            (currentDayIndex === null || currentDayIndex === filteredDays.length - 1))
        }
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}










