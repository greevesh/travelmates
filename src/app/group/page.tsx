"use client";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";

import columns from "./columns";
import rows from "./rows";

initializeApp(firebaseConfig);

const rootStyles = {
  width: "100%",
  "& .Cebu": {
    backgroundColor: "rgba(157, 255, 118, 0.49)",
  },
  "& .Moalboal": {
    backgroundColor: "rgba(255, 255, 10, 0.49)",
  },
  "& .Hanoi": {
    backgroundColor: "rgba(150, 150, 150, 0.49)",
  },
  "& .Taipei": {
    backgroundColor: "rgba(255, 150, 150, 0.49)",
  },
  "& .Brisbane": {
    backgroundColor: "rgba(10, 150, 255, 0.49)",
  },
  "& .Tokyo": {
    backgroundColor: "rgba(224, 183, 60, 0.55)",
  },
  "& .Singapore": {
    backgroundColor: "rgba(122, 153, 60, 0.49)",
  },
};

export default function ColumnSpanningDerived() {
  return (
    <Box sx={rootStyles}>
      <DataGridPro
        columns={columns}
        rows={rows}
        disableRowSelectionOnClick
        hideFooter
        showCellVerticalBorder
        showColumnVerticalBorder
        disableColumnReorder
      />
    </Box>
  );
}
