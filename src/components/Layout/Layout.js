import React from "react";
import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";
import "./Layout.css"; // Add a CSS file for layout-specific styles

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <CustomNavbar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
