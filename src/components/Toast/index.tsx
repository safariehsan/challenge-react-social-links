import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  children: string;
  displayToast: boolean;
  handleToastClose: () => void;
}

export const Toast: React.FC<Props> = (props) => {
  return (
    <Snackbar
      open={props.displayToast}
      onClose={props.handleToastClose}
      autoHideDuration={4000}
    >
      <Alert
        onClose={props.handleToastClose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {props.children}
      </Alert>
    </Snackbar>
  );
};
