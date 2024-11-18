import * as React from "react";
import FeaturedPage from "./components/featured";

export default function Page() {
  return (
    <>
      <FeaturedPage />
      <footer className="footer-home">
        <p className="footer-text-home">
          © 2024 Hotel Verma. All rights reserved. This website is a student project. Copyright-free images provided by Pexels.
        </p>
      </footer>
    </>
  );
}
