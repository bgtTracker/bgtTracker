import React from "react";
import HistoryTable from "./HistoryTable.js";

export default function HistoryTableWithOutDeatils() {
  return (
    <div>
      <HistoryTable details={false} />
    </div>
  );
}
