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
import generateCalendar from "../generateCalendar";
import { slotColumnCommonFields, months, generatedColumns } from "../columns";
import { CalendarDay, Row } from "../../group/types";
import fetchRows, { fetchCurrentUserJourneys } from "../rows";
import getCurrentUserDisplayName from "../getCurrentUserDisplayName";
import EditMembers from "../../components/group/EditMembers";
import { journeyStyles } from "../journeyStyles";

initializeApp(firebaseConfig);

const GroupPage: React.FC = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [currentMonthRows, setCurrentMonthRows] = useState<Row[]>([]);
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedRows = await fetchRows();
      const displayName = await getCurrentUserDisplayName();
      const journeys = await fetchCurrentUserJourneys();

      setColumns(generatedColumns);
      setCurrentMonthRows(
        fetchedRows.map((row) => ({
          ...row,
          name: row.name,
        }))
      );
      setUserDisplayName(displayName);
    }

    fetchData();
  }, []);

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

  useEffect(() => {
    const calendar: CalendarDay[] = generateCalendar(currentYear, monthIndex);
    const filteredRows: Row[] | undefined = currentMonthRows.filter((row) => {
      return row.month === months[monthIndex] && row.year === currentYear;
    });

    calendar.forEach((date) => {
      const day: string = date.day.toString();
      generatedColumns.push({
        field: day,
        headerName: day,
        valueGetter: ({ row }) => row.locations[day],
        sortable: false,
        ...slotColumnCommonFields,
      });
    });
    setColumns(generatedColumns);
    setCurrentMonthRows(filteredRows);
  }, [monthIndex]);

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
      <PreviousMonthButton decrementMonth={decrementMonth} />
      <NextMonthButton incrementMonth={incrementMonth} />
      <EditMembers />
      {months[monthIndex]}, {currentYear}
    </>
  );
};

export default withAuth(GroupPage);
