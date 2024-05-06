import { useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";
import {
  IconButton,
  Stack,
  Typography,
  Container,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState({});
  const [open, setOpen] = useState(false);
  const [grantNameInput, setGrantNameInput] = useState("");
  const [localStorageGrants, setLocalStorageGrants, deleteLocalStorageGrant] =
    useLocalStorage();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setLocalStorageGrants(String(grantNameInput));
    } catch (error) {
      console.error(error);
    } finally {
      // const grants = JSON.parse(localStorage.getItem("grants"));
      // setLocalStorageGrants(String(grants));
      // console.log(localStorageGrants);
      setGrantNameInput("");
    }
  };

  const handleDelete = (grant) => {
    deleteLocalStorageGrant(grant);
  };

  return (
    <>
      <div>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          sx={{ width: "100%", margin: 0, padding: 0 }}
        >
          <Container>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
                Settings
              </Typography>
              {!showResults && (
                <IconButton aria-label="close" onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              )}
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack
                direction="row"
                spacing={1}
                justifyItems="center"
                alignItems="center"
              >
                <TextField
                  id="standard-basic"
                  label="Grant Name"
                  helperText="Must exactly match LS"
                  variant="standard"
                  value={grantNameInput}
                  onChange={(event) => setGrantNameInput(event.target.value)}
                  required
                  sx={{mt: 1}}
                />
                <IconButton aria-label="add a grant" size="small" type="submit">
                  <AddIcon />
                </IconButton>
              </Stack>
            </form>
            <Stack alignItems="center" sx={{mt: 1}}>
              <List sx={{padding: 0}} dense>
                {localStorageGrants &&
                  localStorageGrants.map((grant) => (
                    <ListItem key={grant} sx={{padding: 0}}>
                      <Typography>{grant}</Typography>
                      <IconButton size="small">
                        <CloseIcon
                          size="small"
                          onClick={() => handleDelete(grant)}
                        />
                      </IconButton>
                    </ListItem>
                  ))}
              </List>
            </Stack>
          </Container>
          <Button variant="contained" color="success" sx={{ display: 'block', margin: 'auto', mb: 2 }} onClick={toggleDrawer(false)}>
            Save
          </Button>
        </Drawer>
      </div>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "#ADD8E6",
          px: "1rem"
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "left", fontWeight: "bold" }}>
          LSReports
        </Typography>
        {!showResults && (
          <IconButton aria-label="settings" onClick={toggleDrawer(true)}>
            <SettingsIcon />
          </IconButton>
        )}
      </Stack>
      {!showResults && (
        <Form
          showResults={showResults}
          setShowResults={setShowResults}
          setResultsData={setResultsData}
        />
      )}
      {showResults && (
        <Results
          ExcelAndLSCaseIDs={resultsData}
          setShowResults={setShowResults}
        />
      )}
    </>
  );
}

export default App;
