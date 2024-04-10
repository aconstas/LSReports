import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import Alert from "@mui/material/Alert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";

export default function Results() {
  const missingCases = ["123", "456", "789"];
  const [alert, setAlert] = useState(false);

  const handleCopy = async (caseID) => {
    try {
      await navigator.clipboard.writeText(caseID);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  //   const navigateToCase = (event) => {
  //     event.preventDefault(); // Stop the default navigation

  //     window.open(event.target.href, );
  //   };

  return (
    <div>
      {alert && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={2}
          zIndex={10}
          position={"fixed"}
        >
          <Alert
            icon={false}
            severity="success"
            // sx={{ zIndex: 10, position: "fixed" }}
          >
            Copied to Clipboard
          </Alert>
        </Box>
      )}
      {missingCases.map((caseID) => (
        <Box display="flex" justifyItems="center">
          <Chip label={caseID} onClick={() => handleCopy(caseID)} />
          <a href="https://www.wikipedia.org/" target="_blank">
            <OpenInNewIcon />
          </a>
        </Box>
      ))}
    </div>
  );
}
