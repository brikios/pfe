// Calculate the total price of a booking based on the start and end dates and the listing price per night
export const calculateTotalPrice=(startDate, endDate, pricePerMonth)=>{
    const ONE_DAY_MS = 1000 * 60 * 60 * 24;
    const startDateMs = new Date(startDate).getTime();
    const endDateMs = new Date(endDate).getTime();
    const numNights = Math.ceil((endDateMs - startDateMs) / ONE_DAY_MS);
    return numNights * (pricePerMonth/30);
  }