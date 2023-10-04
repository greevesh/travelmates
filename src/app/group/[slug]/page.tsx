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
import renderColumns from "../renderColumns";
import EditMembers from "../../components/group/EditMembers";
import { journeyStyles } from "../journeyStyles";

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
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const incrementMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderRows = () => {
    const filteredRows: Row[] | undefined = currentMonthRows.filter((row) => {
      return row.month === months[currentMonth] && row.year === currentYear;
    });

    setCurrentMonthRows(filteredRows);
  };

  useEffect(() => {
    renderColumns({ currentYear, currentMonth, slotColumnCommonFields });
    renderRows();
    // const calendar: CalendarDay[] = generateCalendar(currentYear, currentMonth);
    // const filteredRows: Row[] | undefined = currentMonthRows.filter((row) => {
    //   return row.month === months[currentMonth] && row.year === currentYear;
    // });

    // calendar.forEach((date) => {
    //   const day: string = date.day.toString();
    //   generatedColumns.push({
    //     field: day,
    //     headerName: day,
    //     valueGetter: ({ row }) => row.locations[day],
    //     sortable: false,
    //     ...slotColumnCommonFields,
    //   });
    // });
    // setColumns(generatedColumns);
    // setCurrentMonthRows(filteredRows);
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
      <PreviousMonthButton decrementMonth={decrementMonth} />
      <NextMonthButton incrementMonth={incrementMonth} />
      <EditMembers />
      {months[currentMonth]}, {currentYear}
    </>
  );
};

export default withAuth(GroupPage);
