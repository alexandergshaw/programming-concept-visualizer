"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalloutBox from "../../common/CalloutBox";

export default function ShiftFromTraditionalManagementConcept() {
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
        Shift From Traditional Management
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
        Agile changes management from directing every task to creating the
        conditions for teams to deliver value continuously.
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
            Traditional management focus
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Classic management often emphasises detailed upfront planning,
            top-down control, and measuring success by whether the original plan
            was followed.
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
            Agile management focus
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Agile leaders still care about outcomes, but they accept that plans
            will evolve. They focus more on clarity, team alignment, and
            removing obstacles than on controlling every step.
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
            What changes day to day
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Instead of assigning all work in detail, managers help teams
            prioritise, inspect progress often, and adjust quickly when
            priorities or risks change.
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
            What does not change
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Leadership still matters. Agile does not remove accountability; it
            moves it closer to the team doing the work while leaders stay
            responsible for direction and support.
          </Typography>
        </Paper>
      </Box>

      <CalloutBox type="success" title="Leadership shift">
        <Typography
          variant="body2"
          sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
        >
          The biggest change is moving from command-and-control toward coaching,
          enabling, and trusting teams to solve problems.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
