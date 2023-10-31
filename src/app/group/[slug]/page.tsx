"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridColDef } from "@mui/x-data-grid-pro";
import Typography from "@mui/material/Typography";
import withAuth from "../../components/hocs/withAuth";
import PreviousMonthButton from "../../components/group/PreviousMonthButton";
import NextMonthButton from "../../components/group/NextMonthButton";
import { slotColumnCommonFields, months } from "../columns";
import { MonthProps, Row, FlexContainerProps } from "../../group/types";
import renderBaseColumns from "../renderBaseColumns";
import renderExtraColumns from "../renderExtraColumns";
import renderRows from "../renderRows";
import incrementMonth from "../incrementMonth";
import Progress from "../../components/group/Progress";
import EditContent from "../../components/group/EditContent";
import { journeyStyles } from "../journeyStyles";
import decrementMonth from "../decrementMonth";
import GroupForm from "../../components/setup-form/group-form/GroupForm";
import JourneyForm from "../../components/setup-form/journey-form/JourneyForm";

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  display = "flex",
  justifyContent = "flex-start",
}) => <div style={{ display, justifyContent }}>{children}</div>;

const GroupPage: React.FC = () => {
  const [baseColumns, setBaseColumns] = useState<GridColDef[]>([]);
  const [extraColumns, setExtraColumns] = useState<GridColDef[]>([]);
  const [currentMonthRows, setCurrentMonthRows] = useState<Row[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentUserDisplayName, setCurrentUserDisplayName] = useState<
    string | null
  >(null);
  const [fetchedRows, setFetchedRows] = useState<boolean>(false);

  const monthProps: MonthProps = {
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  };

  useEffect(() => {
    renderBaseColumns({
      slotColumnCommonFields,
      setBaseColumns,
    });
  }, []);

  useEffect(() => {
    (() => {
      renderExtraColumns({
        currentYear,
        currentMonth,
        slotColumnCommonFields,
        setExtraColumns,
      });
      renderRows({
        setCurrentMonthRows,
        setCurrentUserDisplayName,
        setFetchedRows,
        currentMonth,
        currentYear,
      });
    })();
  }, [currentMonth]);

  const renderProgress = () => (
    <>
      <Progress />
      <Typography color="textSecondary" variant="h6" component="div">
        Give us a minute
      </Typography>
    </>
  );

  return (
    <>
      {fetchedRows ? (
        <Box>
          <Typography color="textSecondary" variant="h6" component="div">
            {months[currentMonth]}, {currentYear}
          </Typography>
          <FlexContainer>
            <PreviousMonthButton
              decrementMonth={() => decrementMonth(monthProps)}
            />
            <NextMonthButton
              incrementMonth={() => incrementMonth(monthProps)}
            />
          </FlexContainer>
          <DataGridPro
            sx={journeyStyles}
            columns={[...baseColumns, ...extraColumns]}
            rows={currentMonthRows}
            disableRowSelectionOnClick
            hideFooter
            showCellVerticalBorder
            showColumnVerticalBorder
            disableColumnReorder
            disableColumnMenu
          />
          <FlexContainer>
            <EditContent buttonText="edit members" form={<GroupForm />} />
            <div style={{ marginLeft: "5px" }}>
              <EditContent buttonText="edit journeys" form={<JourneyForm />} />
            </div>
          </FlexContainer>
        </Box>
      ) : (
        renderProgress()
      )}
    </>
  );
};

export default withAuth(GroupPage);
