import React from "react";
import Navbar from "../features/navbar/Navbar";
import Checkout from "./Checkout";

function CheckoutPage() {
  return (
    <div>
      <Navbar>
        <Checkout />
      </Navbar>
    </div>
  );
}

export default CheckoutPage;
