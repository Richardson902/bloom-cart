import React from "react";

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${
          i <= rating ? "bi-star-fill text-warning" : "bi-star"
        }`}
      ></i>
    );
  }
  return stars;
};
