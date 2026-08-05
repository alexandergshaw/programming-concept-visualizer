"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalloutBox from "../../common/CalloutBox";

export default function TheAgileMindsetShiftConcept() {
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
        The Agile Mindset Shift
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
        Agile is more than ceremonies. It is a mindset that treats learning,
        collaboration, and adaptation as normal parts of delivery.
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
            From certainty to learning
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Agile teams do not expect to know everything at the start. They use
            short cycles to learn what users need and what the product should
            become.
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
            From outputs to outcomes
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            Success is not just finishing tasks. Agile teams ask whether the
            delivered work solved a real problem or created useful customer
            value.
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
            From silos to teamwork
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            People do not throw work over a wall. Designers, developers,
            testers, and product people collaborate throughout the work instead.
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
            From blame to improvement
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
          >
            When something goes wrong, Agile teams inspect the system and
            process first. Retrospectives help them improve instead of repeating
            the same friction next sprint.
          </Typography>
        </Paper>
      </Box>

      <CalloutBox type="info" title="Mindset before method">
        <Typography
          variant="body2"
          sx={{ color: "var(--ink-soft)", lineHeight: 1.7 }}
        >
          A team can copy Agile meetings without becoming Agile. The real shift
          is how the team thinks about change, value, and learning.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
