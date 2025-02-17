import React from "react";

const Balance = ({ balance }) => {
  // Format balance to 2 decimal places
  const formattedBalance = Number(balance).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return (
    <div className="flex px-4 sm:px-14 my-8">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="text-lg font-semibold ml-4"> {formattedBalance}</div>
    </div>
  );
};

export default Balance;