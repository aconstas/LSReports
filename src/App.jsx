import { Typography } from "@mui/material";
import Form from "./components/Form";
import Results from "./components/Results";
import { useState } from "react";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState({});
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        LSReports
      </Typography>
      {!showResults && <Form
        showResults={showResults}
        setShowResults={setShowResults}
        setResultsData={setResultsData}
      />}
      {showResults && <Results ExcelAndLSCaseIDs={resultsData} setShowResults={setShowResults}/>}
    </>
  );
}

export default App;
