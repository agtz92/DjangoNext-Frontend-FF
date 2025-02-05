"use client"

import React from "react"
import { Typography } from "@mui/material"
import Link from "next/link"
import GenericTable from "../../components/tables/GenericTable" 

export default function CustomerOrdersTable({ orders }) {
    const columns = [
        {
          field: "id",
          label: "Order ID",
          maxWidth: 100,
          render: (value, row) => (
            <Link href={`/orders/${row.id}`} passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography sx={{ fontWeight: "bold" }}>Order #{value}</Typography>
              </a>
            </Link>
          ),
        },
        {
          field: "total",
          label: "Total",
          align: "right",
          maxWidth: 100,
          render: (_, row) =>
            `$${row.items
              .reduce((total, item) => total + item.quantity * item.price, 0)
              .toFixed(2)}`,
        },
        {
          field: "createdAt",
          label: "Created",
          align: "right",
          maxWidth: 150,
          render: (value) => {
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(value));
            return formattedDate;
          },
        },
      ]

  return <GenericTable data={orders} columns={columns} />
}
