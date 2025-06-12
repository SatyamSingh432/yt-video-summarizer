import React from "react";
export default function SummaryCard({ title, text }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
