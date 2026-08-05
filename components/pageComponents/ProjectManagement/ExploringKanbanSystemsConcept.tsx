"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalloutBox from "../../common/CalloutBox";

export default function ExploringKanbanSystemsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "var(--ink)",
          textAlign: "center",
        }}
      >
        Exploring Kanban Systems
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "var(--ink-soft)",
          textAlign: "center",
          maxWidth: 760,
          mx: "auto",
        }}
      >
        A Kanban system manages work as flow, using a visible board and explicit
        policies to move items steadily from request to completion.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
        }}
      >
        <Paper
          elevation={2}
          sx={{ p: 2.5, borderRadius: 2, borderTop: "4px solid var(--info)" }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "var(--ink)", mb: 1 }}
          >
            System thinking
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Kanban looks at how work moves through the whole system rather than
            just how busy individuals are.
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{ p: 2.5, borderRadius: 2, borderTop: "4px solid var(--info)" }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "var(--ink)", mb: 1 }}
          >
            Start with current work
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Teams often adopt Kanban without reorganising roles first. They map
            the existing process, then improve it gradually.
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{ p: 2.5, borderRadius: 2, borderTop: "4px solid var(--info)" }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "var(--ink)", mb: 1 }}
          >
            Flow over batches
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Instead of waiting for a full sprint boundary, Kanban encourages
            continuous movement so work finishes more smoothly and predictably.
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{ p: 2.5, borderRadius: 2, borderTop: "4px solid var(--info)" }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "var(--ink)", mb: 1 }}
          >
            Useful contexts
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Kanban is especially helpful for support, operations, and product
            teams with frequent incoming work and changing priorities.
          </Typography>
        </Paper>
      </Box>

      <CalloutBox type="info" title="Kanban as a system">
        <Typography
          variant="body2"
          sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
        >
          Think of Kanban as a way to understand and improve the flow of work
          through a service, not just as a board with sticky notes.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
