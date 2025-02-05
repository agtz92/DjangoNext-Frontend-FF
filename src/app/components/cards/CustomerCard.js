"use client"

import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material"
import Link from "next/link"

const CustomerCard = ({
  empresa,
  subtitle,
  phone,
  email,
  actionText,
  empresaId,
}) => {
  const handleActionClick = () => {
    alert("Button clicked!")
  }

  return (
    <Card sx={{ height: "100%", minHeight: "200px" }}>
      <CardContent>
        <Link href={`/companies/${empresaId}`}>
          <Typography
            gutterBottom
            sx={{ color: "text.highlight", fontSize: 14 }}
          >
            {empresa}
          </Typography>
        </Link>
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
