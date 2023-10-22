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
import renderColumns from "../renderColumns";
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
  marginTop = "5px",
}) => <div style={{ display, justifyContent, marginTop }}>{children}</div>;

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
  const [fetchedRows, setFetchedRows] = useState<boolean>(false);

  const monthProps: MonthProps = {
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  };

  useEffect(() => {
    const fetchDataAndRender = async () => {
      await renderRows({
        setCurrentMonthRows,
        setUserDisplayName,
        setFetchedRows,
      });

      renderColumns({
        currentYear,
        currentMonth,
        slotColumnCommonFields,
        setColumns,
      });
    };

    fetchDataAndRender();
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
            <div style={{ marginLeft: "5px" }}>
              <NextMonthButton
                incrementMonth={() => incrementMonth(monthProps)}
              />
            </div>
          </FlexContainer>
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
          <FlexContainer>
            <EditContent buttonText="Edit members" form={<GroupForm />} />
            <div style={{ marginLeft: "5px" }}>
              <EditContent buttonText="Edit journeys" form={<JourneyForm />} />
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
