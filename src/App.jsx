import { Typography } from "@mui/material";
import Form from "./components/Form";
import Results from "./components/Results";

function App() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        LSReports
      </Typography>
      <Form />
      <Results />
    </>
  );
}

export default App;
