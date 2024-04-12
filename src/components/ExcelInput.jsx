import { TextField } from "@mui/material";
import PropTypes from "prop-types";
export default function ExcelInput({excelText, setExcelText}) {
  return (
    <TextField
      id="outlined-basic"
      label="Paste Excel"
      variant="outlined"
      margin="normal"
      required
      value={excelText}
      onChange={(event) => {
        setExcelText(event.target.value)
      }}
    />
  );
}

ExcelInput.propTypes = {
  excelText: PropTypes.string,
  setExcelText: PropTypes.func
}
