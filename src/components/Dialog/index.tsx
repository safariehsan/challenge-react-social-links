import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ModalStyles } from "../../constants";

interface Props {
  displayModal: boolean;
  handleModalClose: () => void;
  confirmDelete: string;
  setConfirmDelete: (e: any) => void;
  handleDelete: () => void;
}

export const Dialog: React.FC<Props> = (props) => {
  return (
    <Modal
      open={props.displayModal}
      onClose={props.handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ModalStyles}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          آیا از تصمیم خود مطمئن هستید؟
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          برای حذف مسیر ارتباطی لطفا تایید را بنویسید
        </Typography>
        <TextField
          fullWidth
          placeholder="تایید"
          id="confirm_delete"
          name="confirm_delete"
          value={props.confirmDelete}
          onChange={(e) => props.setConfirmDelete(e.target.value)}
          sx={{ margin: "15px 0" }}
        />
        <Button
          variant="text"
          color="error"
          onClick={props.handleDelete}
          disabled={props.confirmDelete === "تایید" ? false : true}
        >
          حذف
        </Button>
        <Button variant="text" color="warning" onClick={props.handleModalClose}>
          انصراف
        </Button>
      </Box>
    </Modal>
  );
};
