"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalloutBox from "../../common/CalloutBox";

export default function HistoryOfAgileDevelopmentConcept() {
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
        History Of Agile Development
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
        Agile emerged as a response to heavyweight software processes that
        struggled when requirements changed faster than the plan.
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
            Before Agile
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Many software teams used long, document-heavy processes. That worked
            better for predictable projects, but it often delayed feedback until
            very late in the project.
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
            Why it changed
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            By the 1990s, teams building software needed shorter feedback loops.
            Internet products, changing customer needs, and technical
            uncertainty pushed teams to iterate faster.
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
            The Agile Manifesto
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            In 2001, a group of practitioners met in Snowbird, Utah and wrote
            the Agile Manifesto. It did not invent iteration, but it gave a
            shared language to flexible, human-centered delivery.
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
            What stayed with us
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Modern Agile teams still value short delivery cycles, frequent
            learning, customer collaboration, and adapting the plan as new
            information appears.
          </Typography>
        </Paper>
      </Box>

      <CalloutBox type="info" title="Big idea">
        <Typography
          variant="body2"
          sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
        >
          Agile grew out of real frustration with slow feedback and rigid plans.
          Its history explains why adaptability is such a central value.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
