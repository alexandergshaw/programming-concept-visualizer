import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: any
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">{title}</Typography>
      {subtitle && (
        <Typography sx={{ mb: 2 }} className="map-description">
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
}