import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, Chip, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import LinkComponent from "./Link";

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
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Missing in Excel ({missingExcelValues.length})
          </Typography>
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
          <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
            Missing in LS ({missingLSValues.length})
          </Typography>
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
            />
          </div>
        ))}
      </Box>
      <Button
        variant="contained"
        size="medium"
        color="success"
        onClick={() => setShowResults(false)}
        sx={{ mt: 3, mb: 3 }}
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