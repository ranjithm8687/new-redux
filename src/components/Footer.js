import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className=" bg-slate-700 p-5 text-white">
      <p className=" text-center"> All Rights &copy; {date.getFullYear()} </p>
    </footer>
  );
};

export default Footer;
