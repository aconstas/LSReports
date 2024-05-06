import { Button } from "@mui/material";

export default function CompareButton({ color }) {
  return (
    <Button variant="contained" type="submit" size="large" sx={{ mt: 6, mb: 1, width: "50%", mx: "auto" }} color={color}>
      Compare
    </Button>
  );
}
