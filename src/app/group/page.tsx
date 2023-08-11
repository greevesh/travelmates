"use client";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";

import rows from "./rows";
import NextMonthButton from "./NextMonthButton";
import generateCalendar from "./generateCalendar";
import { slotColumnCommonFields } from "./columns";
import { rootStyles } from "./rootStyles";
import { GridColDef } from "@mui/x-data-grid-pro";

initializeApp(firebaseConfig);

export default function ColumnSpanningDerived() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [selectedMonth, setselectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const calendar = generateCalendar(currentYear, selectedMonth);

  const incrementMonth = (): void => {
    setselectedMonth(selectedMonth + 1);
  };

  const generateColumns = (): void => {
    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Name",
      },
    ];
    calendar.forEach((date) => {
      const day: string = date.day.toString();
      columns.push({
        field: day,
        headerName: day,
        valueGetter: ({ row }) => row.slots[day],
        sortable: false,
        ...slotColumnCommonFields,
      });
      setColumns(columns);
    });
  };

  useEffect(() => {
    generateColumns();
  }, [selectedMonth]);

  return (
    <>
      <Box sx={rootStyles}>
        <DataGridPro
          columns={columns}
          rows={rows}
          disableRowSelectionOnClick
          hideFooter
          showCellVerticalBorder
          showColumnVerticalBorder
          disableColumnReorder
          disableColumnMenu
        />
      </Box>
      <NextMonthButton incrementMonth={incrementMonth} />
    </>
  );
}
