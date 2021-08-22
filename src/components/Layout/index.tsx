import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: any;
}

/**
 * @description Kapsayıcı componentimiz.
 * İleri aşamada yeni bir sayfa daha açmak istediğimizde sadece children parametresini göndererek Navbar, Footer gibi değişmeyen componentlerimiz de paket halinde gelir.
 * @param children Herhangi bir component.
 * @constructor
 */
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
