import React from "react"
import { Card, CardHeader, CardContent, Avatar } from "@mui/material"

const SummaryCard = ({ bgcolor, avatarText, title, content }) => {
  return (
    <Card sx={{ height:"100%", minHeight: "200px" }}>
      <CardHeader
        title={title}
        avatar={
          <Avatar sx={{ bgcolor }} aria-label="avatar">
            {typeof avatarText === "string" ? avatarText : avatarText}
          </Avatar>
        }
      />
      <CardContent>
        <h1 style={{ width: "100%", textAlign: "center"}} >{content}</h1>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
