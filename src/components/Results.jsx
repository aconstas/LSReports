import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, Chip, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import LinkComponent from "./Link";
import "animate.css";

export default function Results({ ExcelAndLSCaseIDs, setShowResults }) {
  console.log(ExcelAndLSCaseIDs);
  const { missingExcelValues, missingLSValues } = ExcelAndLSCaseIDs;
  const [alert, setAlert] = useState(false);

  const handleCopy = async (caseID) => {
    try {
      await navigator.clipboard.writeText(caseID);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 900);
    } catch (err) {
      console.error(err);
    }
  };

  const openAllMissingExcelCases = () => {
    missingExcelValues.forEach((caseID) => {
      const url = `https://aaaj.legalserver.org/matter/switch/view/${caseID.substr(
        -6
      )}`;
      chrome.tabs.create({ url: url, active: false });
    });
  };

  const openAllMissingLSCases = () => {
    missingLSValues.forEach((caseID) => {
      const url = `https://aaaj.legalserver.org/matter/switch/view/${caseID.substr(
        -6
      )}`;
      chrome.tabs.create({ url: url, active: false });
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {alert && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={2}
          zIndex={10}
          position={"fixed"}
        >
          <Alert icon={false} severity="success">
            Copied to Clipboard
          </Alert>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {missingExcelValues && (
          <>
            <Typography
              variant="h5"
              sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
            >
              Missing in Excel ({missingExcelValues.length})
            </Typography>
            {missingExcelValues.length !== 0 && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                title="Open all case links"
                sx={{ mb: 1 }}
                disableElevation
                onClick={openAllMissingExcelCases}
              >
                Open all cases
              </Button>
            )}
          </>
        )}
        {missingExcelValues?.map((caseID) => (
          <div
            key={caseID}
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Chip
              label={caseID}
              onClick={() => handleCopy(caseID)}
              key={caseID}
              title="Copy Case ID"
            />
            <LinkComponent caseID={caseID} />
          </div>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {missingLSValues && (
          <>
            <Typography
              variant="h5"
              sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
            >
              Missing in LS ({missingLSValues.length})
            </Typography>
            {missingLSValues.length !== 0 && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                title="Open all case links"
                sx={{ mb: 1 }}
                disableElevation
                onClick={openAllMissingLSCases}
              >
                Open all cases
              </Button>
            )}
          </>
        )}
        {missingLSValues?.map((caseID) => (
          <div
            key={caseID}
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Chip
              label={caseID}
              onClick={() => handleCopy(caseID)}
              key={caseID}
              title="Copy Case ID"
            />
            <LinkComponent caseID={caseID} />
          </div>
        ))}
      </Box>
      {missingExcelValues.length === 0 && missingLSValues.length === 0 && (
        <Box className="animate__animated animate__heartBeat" sx={{my: 4}}>
          <Typography variant="h4" sx={{fontWeight: "bold", color: "orange"}}>Perfect!</Typography>
        </Box>
      )}
      <Button
        variant="contained"
        size="medium"
        color="success"
        onClick={() => setShowResults(false)}
        sx={{ mt: 4, mb: 1 }}
      >
        Done
      </Button>
    </div>
  );
}

Results.propTypes = {
  ExcelAndLSCaseIDs: PropTypes.object,
  setShowResults: PropTypes.func,
};
