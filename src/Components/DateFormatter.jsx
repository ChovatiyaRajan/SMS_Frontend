import React from "react";

const DateFormatter = ({ date }) => {
  if (!date) return "—"; // handle empty or null date

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
