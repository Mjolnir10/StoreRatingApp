import React from "react";
import { Box, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function FilterBar() {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField label="Search…" variant="outlined" size="small" sx={{ flex: 1 }} />
      <FormControl variant="outlined" size="small">
        <InputLabel id="date-range-label">Date Range</InputLabel>
        <Select labelId="date-range-label" label="Date Range" defaultValue="last30">
          <MenuItem value="last7">Last 7 days</MenuItem>
          <MenuItem value="last30">Last 30 days</MenuItem>
          <MenuItem value="thisMonth">This month</MenuItem>
          <MenuItem value="custom">Custom…</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
