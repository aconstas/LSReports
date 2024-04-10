import { Checkbox, FormControlLabel } from "@mui/material";

export default function GrantChecbox({ label }) {
  return <FormControlLabel control={<Checkbox />} label={label} />;
}
