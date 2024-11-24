"use client";
import React from "react";
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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";

import Link from "next/link";

const Header: React.FC = () => {
  // const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const subItems = ["Dashboard", "Items", "Users"];

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

  const navigateTo = (item: string) => {
    setMobileOpen(false);
    console.group(item);
    // switch (item) {
    //   case "Ongoing": {
    //     router.push("/orders/ongoing");
    //     break;
    //   }
    //   case "Past": {
    //     router.push("/orders/past");
    //     break;
    //   }
    //   case "Blogs": {
    //     window.open("https://blog.recipecup.com", "_blank");
    //     break;
    //   }
    //   case "Your Profile": {
    //     router.push("/customer/profile");
    //     break;
    //   }
    //   case "Contact": {
    //     router.push("/contactus");
    //     break;
    //   }
    //   case "About Recipe Cup": {
    //     router.push("/about-us");
    //     break;
    //   }
    // }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, color: "#000" }}
          >
            <MenuIcon fontSize={"large"} />
          </IconButton>
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
            <Avatar sx={{ width: "36px", height: "36px" }}></Avatar>
            <Link href="/login">
              <Button className="rounded-full">Sign In</Button>
            </Link>
            <Link href="/dietitian-login">
              <Button className="rounded-full">Admin</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
              <Box sx={{ width: "100%", textAlign: "left" }}>
                <IconButton
                  aria-label="close drawer"
                  onClick={handleDrawerToggle}
                  sx={{ ml: "2rem", mt: "0.5rem", color: "#000" }}
                >
                  <CloseIcon fontSize={"large"} />
                </IconButton>
              </Box>
              <List
                sx={{ padding: "6px 0 6px" }}
                className="font-montserrat font-medium"
              >
                {subItems.map((item) => (
                  <ListItem
                    key={item}
                    sx={{ paddingTop: "4px", paddingBottom: "4px" }}
                  >
                    <ListItemButton
                      sx={{ textAlign: "left", padding: "0 4rem 0 5rem" }}
                      onClick={() => navigateTo(item)}
                    >
                      <ListItemText
                        disableTypography
                        sx={{ fontSize: "16px" }}
                        primary={item}
                      />
                      <ChevronRightIcon fontSize={"large"} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ marginBottom: "6%" }} className="font-montserrat">
              <Divider />
              <Box className="pt-4 pe-16 text-right">
                <Link href="/login">
                  <Button className="rounded-full">Sign In</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
};

export default Header;
