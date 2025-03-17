import { Box } from "@mui/material";
import { ReactNode } from "react";
import { AppNavbar } from "./AppNavBar";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  userDisplayName?: string;
}

export const AppLayout = ({
  children,
  title,
  userDisplayName,
}: AppLayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        flex: 1,
      }}
    >
      <AppNavbar title={title} userDisplayName={userDisplayName} />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
