import { Box, Typography, Paper, Button, useTheme, alpha } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  linkTo?: string;
  linkText?: string;
}

export const DashboardCard = ({
  title,
  value,
  icon,
  color,
  linkTo,
  linkText = "Ver todos",
}: DashboardCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: alpha(theme.palette[color].main, 0.1),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: `${color}.main`,
              color: `${color}.contrastText`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={`${color}.main`}>
              {value}
            </Typography>
          </Box>
        </Box>
        {linkTo && (
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              mt: "auto",
            }}
          >
            <Button
              component={Link}
              to={linkTo}
              size="small"
              color={color}
              endIcon={<ArrowForward />}
            >
              {linkText}
            </Button>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};
