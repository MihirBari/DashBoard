import React from "react";
import TotalProducts from "./TotalProducts";
import TotalProductsSold from "./TotalProductsSold";
import TotalProductsLeft from "./TotalProductsLeft";
import TotalAmountCollected from "./TotalAmountCollected";
import TotalReturned from "./TotalReturned";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-7">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">Products</h1>
      </div>

      <div className="flex space-x-4"> {/* Adjust the space-x value as needed */}
        <TotalProducts />
        <TotalProductsSold />
        <TotalProductsLeft />
        <TotalAmountCollected />
        <TotalReturned />
      </div>
    </div>
  );
};

export default Main;
