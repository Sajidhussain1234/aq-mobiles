import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "./counterSlice";

export default function UserProfile() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return <></>;
}
