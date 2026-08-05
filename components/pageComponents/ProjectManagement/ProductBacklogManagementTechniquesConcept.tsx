"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalloutBox from "../../common/CalloutBox";

export default function ProductBacklogManagementTechniquesConcept() {
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
        Product Backlog Management Techniques
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
        Backlog management keeps future work visible, ordered, and ready enough
        that the team can make good sprint decisions.
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
            Ordering by value
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            A healthy backlog is not just a long list. High-value, high-risk, or
            time-sensitive work is placed where the team can address it sooner.
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
            Refinement
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Teams regularly review upcoming items, split oversized work, clarify
            acceptance expectations, and remove items that no longer matter.
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
            Keep it lean
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            An overloaded backlog creates noise. Good backlog management keeps
            enough future work to plan well without preserving every idea
            forever.
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
            Use multiple signals
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Priority decisions often combine customer value, urgency,
            dependencies, learning goals, and technical risk rather than relying
            on one factor alone.
          </Typography>
        </Paper>
      </Box>

      <CalloutBox type="warning" title="A backlog is a decision tool">
        <Typography
          variant="body2"
          sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
        >
          Backlog management is not clerical maintenance. It is an ongoing
          product decision process about what is worth doing next.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
