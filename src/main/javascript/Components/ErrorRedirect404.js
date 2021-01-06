import React from "react";

export default function ErrorRedirect404() {
  if (typeof window !== "undefined") {
    window.location.replace("/404");
  }
  return (
    <div>
      <h1> Not found - error occured - redirectig</h1>
      <h1 href="/"> HomePage</h1>
    </div>
  );
}
