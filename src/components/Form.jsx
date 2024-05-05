import PropTypes from "prop-types";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Stack,
  Container,
} from "@mui/material";
import ExcelInput from "./ExcelInput";
import SettingsIcon from "@mui/icons-material/Settings";
import CompareButton from "./CompareButton";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Form({ setShowResults, setResultsData }) {
  const [excelText, setExcelText] = useState("");
  const [grantNames, setGrantNames] = useLocalStorage();
  const [selectedGrants, setSelectedGrants] = useState([]);

  const handleSubmit = (event) => {
    console.log(selectedGrants);
    event.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "extractData",
          tables: selectedGrants,
          excelText: excelText,
        },
        (response) => {
          setResultsData(response.data);
          setShowResults(true);
        }
      );
    });
  };

  const handleCheckboxChange = (grant) => {
    setSelectedGrants((prevSelectedGrants) => {
      if (prevSelectedGrants.includes(grant)) {
        return prevSelectedGrants.filter(
          (selectedGrant) => selectedGrant !== grant
        );
      } else {
        return [...prevSelectedGrants, grant];
      }
    });
  };

  return (
    <Container maxWidth="sm" sx={{mt: 2}}>
      {!grantNames ||
        (grantNames.length === 0 && (
          <Stack
            direction="row"
            alignItems="center"
            textAlign="center"
            spacing={0.5}
            sx={{ justifyContent: "center", my: 4 }}
          >
            <p>Click </p>
            <SettingsIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <p>to add a grant</p>
          </Stack>
        ))}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {grantNames &&
            grantNames.map((grant) => (
              <FormControlLabel
                control={<Checkbox />}
                label={grant}
                checked={selectedGrants.includes(grant)}
                onClick={() => handleCheckboxChange(grant)}
                key={grant}
                sx={{height: "30px"}}
              />
            ))}
        </FormGroup>
        <ExcelInput excelText={excelText} setExcelText={setExcelText} />
        <CompareButton color="warning" />
      </form>
    </Container>
  );
}

Form.propTypes = {
  setShowResults: PropTypes.func,
  setResultsData: PropTypes.func,
};
