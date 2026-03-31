import { api } from "./config";

// Fetch booking details by ID
export async function getBookingDetail(id) {
  try {
    // console.log('Fetching booking details for ID:', id);
    const res = await api.get("/booking/get-booking", {
      params: { id: id },
    });
    // console.log('Booking details response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch booking details"
    );
  }
}

export async function submitBookingDetail(formData) {
  try {
    // console.log('========== SENDING TO API ==========');
    
    // Log all FormData entries
    const formDataEntries = [];
    for (let pair of formData.entries()) {
      if (pair[0].includes('proof') && pair[1] instanceof File) {
        formDataEntries.push({
          field: pair[0],
          type: 'File',
          name: pair[1].name,
          size: pair[1].size,
          mimeType: pair[1].type
        });
        // console.log(`${pair[0]}: File - ${pair[1].name} (${pair[1].size} bytes)`);
      } else {
        formDataEntries.push({
          field: pair[0],
          value: pair[1].substring ? pair[1].substring(0, 200) : pair[1]
        });
        // console.log(`${pair[0]}: ${pair[1].substring ? pair[1].substring(0, 200) + '...' : pair[1]}`);
      }
    }
    // console.log('====================================');

    const endpoint = "https://dashboard.enlivetrips.com/api/booking/booking-information";

    // formData.append(booking_id : id)
    // Try with different content-type headers
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - let browser set it
    });

    // console.log('Response status:', res.status);
    // console.log('Response headers:', Object.fromEntries(res.headers.entries()));

    // Try to get response as text first
    const responseText = await res.text();
    // console.log('Raw response text:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      // console.log('Parsed response:', responseData);
    } catch (e) {
      // console.log('Response is not JSON');
      responseData = { message: responseText };
    }

    if (!res.ok) {
      throw new Error(responseData.message || `HTTP error! Status: ${res.status}`);
    }

    return responseData;

  } catch (error) {
    console.error("Booking submission error:", error);
    throw error;
  }
}

