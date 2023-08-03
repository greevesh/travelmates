"use client";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";

import columns from "./columns";
import rows from "./rows";

initializeApp(firebaseConfig);

export default function DataGridProDemo() {
  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <DataGridPro
        loading={rows.length === 0}
        rowHeight={38}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
