import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <UserOrders />
      </Navbar>
    </div>
  );
}

export default UserOrdersPage;
