import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" ">
      <Header />
      <div className=" flex min-h-screen justify-center py-5 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
