"use client";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";

import rows from "./rows";
import PreviousMonthButton from "./PreviousMonthButton";
import NextMonthButton from "./NextMonthButton";
import generateCalendar from "./generateCalendar";
import { slotColumnCommonFields, months, generatedColumns } from "./columns";
import { rootStyles } from "./rootStyles";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Row } from "../types";

initializeApp(firebaseConfig);

const GroupPage = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [currentMonthRows, setCurrentMonthRows] = useState<Row[]>([]);
  const [monthIndex, setMonthIndex] = useState<number>(7);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const decrementMonth = (): void => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const incrementMonth = (): void => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  const generateColumns = (): void => {
    const calendar = generateCalendar(currentYear, monthIndex);
    const filteredRows = rows.filter((row) => {
      return row.month === months[monthIndex];
    });

    calendar.forEach((date) => {
      const day: string = date.day.toString();
      generatedColumns.push({
        field: day,
        headerName: day,
        valueGetter: ({ row }) => row.places[day],
        sortable: false,
        ...slotColumnCommonFields,
      });
    });
    setColumns(generatedColumns);
    setCurrentMonthRows(filteredRows);
  };

  useEffect(() => {
    generateColumns();
  }, [monthIndex]);

  return (
    <>
      <Box sx={rootStyles}>
        <DataGridPro
          columns={columns}
          rows={currentMonthRows}
          disableRowSelectionOnClick
          hideFooter
          showCellVerticalBorder
          showColumnVerticalBorder
          disableColumnReorder
          disableColumnMenu
        />
      </Box>
      <PreviousMonthButton decrementMonth={decrementMonth} />
      <NextMonthButton incrementMonth={incrementMonth} />
      {months[monthIndex]}, {currentYear}
    </>
  );
};

export default GroupPage;
