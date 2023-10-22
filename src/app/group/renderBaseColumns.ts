import { RenderBaseColumnsProps } from "./types";

const renderBaseColumns = ({
  slotColumnCommonFields,
  setBaseColumns,
}: RenderBaseColumnsProps): void => {
  // generate first 28 days in the calendar because every month will have
  // at least 28 days
  const baseCalendarColumns = Array.from({ length: 28 }, (_, index) => {
    const day = (index + 1).toString();
    return {
      field: day,
      headerName: day,
      valueGetter: ({ row }) => row.locations[day],
      sortable: false,
      ...slotColumnCommonFields,
    };
  });

  // columns that only need to be rendered once
  const baseColumns = [
    {
      field: "name",
      headerName: "Name",
      valueGetter: ({ row }) => row.name,
      sortable: false,
      ...slotColumnCommonFields,
    },
    ...baseCalendarColumns,
  ];

  setBaseColumns([...baseColumns]);
};

export default renderBaseColumns;
