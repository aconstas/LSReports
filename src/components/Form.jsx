import { FormGroup } from "@mui/material";
import GrantChecbox from "./GrantCheckbox";
import ExcelInput from "./ExcelInput";
import CompareButton from "./CompareButton";

export default function Form() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("The form was submitted.");
  };

  return (
    <form onSubmit={handleSubmit} sx={{ display: "flex" }}>
      <FormGroup>
        <GrantChecbox label={"CDSS"} />
        <GrantChecbox label={"ONECA-C"} />
      </FormGroup>
      <ExcelInput />
      <CompareButton />
    </form>
  );
}
