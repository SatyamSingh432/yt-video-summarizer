import React from "react";
import { useSummaries } from "../context/SummaryContext";
import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  const { summaries } = useSummaries();

  return (
    <div>
      {summaries.map((s, i) => (
        <SummaryCard key={i} {...s} />
      ))}
    </div>
  );
}
