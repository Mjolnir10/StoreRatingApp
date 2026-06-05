import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ShoppingCart, People, AttachMoney } from "@mui/icons-material";

const iconMap = {
  store: <ShoppingCart fontSize="large" />, // pass "store"
  people: <People fontSize="large" />, // pass "people"
  revenue: <AttachMoney fontSize="large" />, // pass "revenue"
};

export default function StatCard({ title, value, icon }) {
  const iconElement = iconMap[icon] || <ShoppingCart fontSize="large" />;
  return (
    <Card sx={{ minWidth: 200, textAlign: "center", p: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>{iconElement}</Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
