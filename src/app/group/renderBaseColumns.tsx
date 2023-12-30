import Avatar from "@mui/material/Avatar";
import { RenderBaseColumnsProps } from "./types";

const renderBaseColumns = ({
  slotColumnCommonFields,
  setBaseColumns,
}: RenderBaseColumnsProps): void => {
  // Generate first 28 days in the calendar because every month will have
  // at least 28 days
  const baseCalendarColumns = Array.from({ length: 28 }, (_, index) => {
    const day = (index + 1).toString();
    return {
      field: day,
      headerName: day,
      maxWidth: 20,
      valueGetter: ({ row }) => row.locations[day],
      sortable: false,
      ...slotColumnCommonFields,
    };
  });

  // Columns that only need to be rendered once
  const baseColumns = [
    {
      field: "Group Members",
      headerName: "Group Members",
      minWidth: 180,
      renderCell: ({ row }) => {
        const { name, photoUrl } = row;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {photoUrl && (
              <Avatar
                src={photoUrl}
                alt={name}
                style={{
                  marginRight: 8,
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                }}
              />
            )}
            {name}
          </div>
        );
      },
      sortable: false,
    },
    ...baseCalendarColumns,
  ];

  setBaseColumns([...baseColumns]);
};

export default renderBaseColumns;
