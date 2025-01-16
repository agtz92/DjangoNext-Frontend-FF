"use client"

import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material"

const CustomerCard = ({ empresa, subtitle, phone, email, actionText }) => {
  const handleActionClick = () => {
    alert("Button clicked!")
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {empresa}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {subtitle}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {phone}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleActionClick}>
          {actionText}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CustomerCard
