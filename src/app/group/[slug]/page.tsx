"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridColDef } from "@mui/x-data-grid-pro";
import { initializeApp } from "../../../../node_modules/firebase/app";
import firebaseConfig from "../../../../firebase/config";
import withAuth from "../../components/hocs/withAuth";
import PreviousMonthButton from "../../components/group/PreviousMonthButton";
import NextMonthButton from "../../components/group/NextMonthButton";
import { slotColumnCommonFields, months } from "../columns";
import { MonthProps, Row } from "../../group/types";
import fetchGridData from "../fetchGridData";
import renderColumns from "../renderColumns";
import renderRows from "../renderRows";
import incrementMonth from "../incrementMonth";
import EditMembers from "../../components/group/EditMembers";
import { journeyStyles } from "../journeyStyles";
import decrementMonth from "../decrementMonth";

initializeApp(firebaseConfig);

const GroupPage: React.FC = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [currentMonthRows, setCurrentMonthRows] = useState<Row[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  const monthProps: MonthProps = {
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  };

  useEffect(() => {
    fetchGridData({ setColumns, setCurrentMonthRows, setUserDisplayName });
  }, []);

  useEffect(() => {
    renderColumns({ currentYear, currentMonth, slotColumnCommonFields });
    renderRows({
      currentMonthRows,
      months,
      currentMonth,
      currentYear,
      setCurrentMonthRows,
    });
  }, [currentMonth]);

  return (
    <>
      <Box>
        <DataGridPro
          sx={journeyStyles}
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
      <PreviousMonthButton decrementMonth={() => decrementMonth(monthProps)} />
      <NextMonthButton incrementMonth={() => incrementMonth(monthProps)} />
      <EditMembers />
      {months[currentMonth]}, {currentYear}
    </>
  );
};

export default withAuth(GroupPage);
