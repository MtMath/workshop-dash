import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface AppNavbarProps {
  title?: string;
  userDisplayName?: string;
}

export const AppNavbar = ({
  title = "Workshop Manager",
  userDisplayName = "Admin User",
}: AppNavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Workshops", icon: <EventIcon />, path: "/workshops" },
    { label: "Colaboradores", icon: <PeopleIcon />, path: "/collaborators" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          component={Link}
          to={item.path}
          key={item.path}
          sx={{
            mx: 1,
            color: isActive(item.path) ? "primary.main" : "inherit",
            position: "relative",
            minWidth: { sm: "120px" },
            height: "64px",
            "&:hover": {
              bgcolor: "background.paper",
              color: "primary.main",
            },
          }}
          startIcon={item.icon}
        >
          <Typography
            variant="body1"
            fontWeight={isActive(item.path) ? "bold" : "normal"}
          >
            {item.label}
          </Typography>
          {isActive(item.path) && (
            <motion.div
              layoutId="activeIndicator"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "2px 2px 0 0",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Container
          sx={{
            width: "100%",
            maxWidth: "100% !important",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
              height: "64px",
            }}
          >
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/dashboard"
                  sx={{
                    mr: 2,
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}

            {!isMobile ? (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    height: "64px",
                  }}
                >
                  <NavLinks />
                </Box>
                <Box
                  sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 32,
                      height: 32,
                      fontSize: "0.875rem",
                    }}
                  >
                    {userDisplayName.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
                  >
                    {userDisplayName}
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {title}
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 32,
                    height: 32,
                    fontSize: "0.875rem",
                  }}
                >
                  {userDisplayName.charAt(0)}
                </Avatar>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
