import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import ExcelInput from "./ExcelInput";
import CompareButton from "./CompareButton";
import { useState } from "react";

export default function Form({ setShowResults, setResultsData }) {
  const [ISF_NAC, setISF_NAC] = useState(false);
  const [ONECA, setONECA] = useState(false);
  const [excelText, setExcelText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectTables = [];
    if (ISF_NAC) {
      selectTables.push("ISF_NAC Both");
    }
    if (ONECA) {
      selectTables.push("ONECA-C");
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "extractData",
          tables: selectTables,
          excelText: excelText,
        },
        (response) => {
          setResultsData(response.data);
          setShowResults(true);
        }
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={"ISF_NAC Both"}
          checked={ISF_NAC}
          onClick={() => setISF_NAC(!ISF_NAC)}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={"ONECA-C"}
          checked={ONECA}
          onClick={() => setONECA(!ONECA)}
        />
      </FormGroup>
      <ExcelInput excelText={excelText} setExcelText={setExcelText} />
      <CompareButton />
    </form>
  );
}
