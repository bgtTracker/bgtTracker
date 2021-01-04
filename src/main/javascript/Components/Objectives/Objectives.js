import React from "react";
import ObjectivesTable from "./ObjectivesTable.js";

export default function Objectives() {
  let headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "date", numeric: true, disablePadding: false, label: "End date" },
    { id: "category", numeric: true, disablePadding: false, label: "Category"}, //?? acount numberic or not
    { id: "Progress", numeric: true, disablePadding: false, label: "Progress" },
    { id: "amount", numeric: true, disablePadding: false, label: "Amount" }
  ];

  return (
    <div>
      <ObjectivesTable details={true} headCells={headCells}  />
    </div>
  );
}