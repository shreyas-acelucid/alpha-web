"use client";
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { getRole, getToken, logout } from "@/app/utils/helpers";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GradingIcon from "@mui/icons-material/Grading";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = getToken();
  const role = getRole();
  const currentTime = Math.floor(Date.now() / 1000);
  const path = usePathname();

  // const userPaths = ["/dashboard", "/customer"];
  // const isUser = userPaths.some((path) =>
  //   router.pathname.includes(path)
  // );

  // const dietPaths = ["/dashboard", "/customer"];
  // const isDiet = dietPaths.some((path) =>
  //   router.pathname.includes(path)
  // );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp && currentTime > decoded.exp) {
        logout();
      }
    }
  }, [path]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "white" }}>
        <Toolbar>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            // variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#000",
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                loading="lazy"
                alt="ALPHA NUTRITION"
                className="w-8 h-8 mr-2"
              />
            </Link>
          </Typography>
          <Box className="flex flex-row gap-4 items-center">
            {token ? (
              <Avatar sx={{ width: "36px", height: "36px" }}></Avatar>
            ) : (
              <>
                <Link href="/login">
                  <Button className="!rounded-full">Sign In</Button>
                </Link>
                <Link href="/dietitian-login">
                  <Button className="!rounded-full">Admin</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: { xs: "100vw", sm: "400px" },
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontSize: "16px",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box className="flex flex-row justify-between items-center mt-4 mb-6">
                <p className="text-2xl font-semibold ms-4">
                  Dietitian Dashboard
                </p>
                <IconButton
                  aria-label="close drawer"
                  sx={{ mr: "1rem", color: "#000" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {role && role === "diet" && (
                <List sx={{ padding: "6px 0 6px" }} className="font-medium">
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <HomeIcon sx={{ color: "var(--color-primary-700)" }} />
                      <ListItemText disableTypography primary={"Home"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <GroupIcon sx={{ color: "var(--color-primary-700)" }} />
                      <ListItemText disableTypography primary={"Users"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <CategoryIcon
                        sx={{ color: "var(--color-primary-700)" }}
                      />
                      <ListItemText disableTypography primary={"Items"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <FitnessCenterIcon
                        sx={{ color: "var(--color-primary-700)" }}
                      />
                      <ListItemText disableTypography primary={"Exercises"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
              {role && role === "user" && (
                <List sx={{ padding: "6px 0 6px" }} className="font-medium">
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <HomeIcon sx={{ color: "var(--color-primary-700)" }} />
                      <ListItemText disableTypography primary={"Home"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <DashboardIcon
                        sx={{ color: "var(--color-primary-700)" }}
                      />
                      <ListItemText disableTypography primary={"Dashboard"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <EventRepeatIcon
                        sx={{ color: "var(--color-primary-700)" }}
                      />
                      <ListItemText disableTypography primary={"Progress"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <GradingIcon sx={{ color: "var(--color-primary-700)" }} />
                      <ListItemText disableTypography primary={"Feedback"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ paddingTop: "4px", paddingBottom: "4px" }}>
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <EmojiEventsIcon
                        sx={{ color: "var(--color-primary-700)" }}
                      />
                      <ListItemText disableTypography primary={"Rewards"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
            </Box>
            <Box className="mb-4">
              <Divider />
              <Box className="pt-4 pe-16 justify-end flex flex-row gap-4">
                {!token ? (
                  <>
                    <Link href="/login">
                      <Button
                        className="!rounded-full"
                        onClick={handleDrawerToggle}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/dietitian-login">
                      <Button
                        className="!rounded-full"
                        onClick={handleDrawerToggle}
                      >
                        Admin
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    className="!rounded-full"
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
};

export default Header;
