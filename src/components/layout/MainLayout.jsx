import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}
