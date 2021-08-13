import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />

      <hr />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
