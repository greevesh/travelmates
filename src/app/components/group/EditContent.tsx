import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";

interface EditContentProps {
  buttonText: string;
  form: React.ReactElement;
}

const EditContent: React.FC<EditContentProps> = ({ buttonText, form }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
    [theme.breakpoints.up("sm")]: {
      width: 500,
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>{form}</Box>
      </Modal>
    </div>
  );
};

export default EditContent;
