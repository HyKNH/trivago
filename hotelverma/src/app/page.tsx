// app/page.tsx
import * as React from "react";
import FeaturedPage from "./components/featured";

export default function Page() {
  return (
    <>
      <FeaturedPage />
      
      <footer style={footerStyle}>
        <p style={textStyle}>
          © 2024 Hotel Verma. All rights reserved. This website is a student project. Copyright-free images provided by Pexels.
        </p>
      </footer>
    </>
  );
}

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#f1f1f1",
  textAlign: "center",
  padding: "10px 0",
};

const textStyle = {
  fontSize: "12px",
  color: "#555", 
};