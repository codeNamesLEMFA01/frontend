import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"

import logo from "@assets/logo.png"
import { Menu as MenuIcon, PowerSettingsNew } from "@mui/icons-material"

import { AnchorEnum } from "@src/types/common"

import ScrollTo from "./ScrollTo"
import useAnchor from "./hooks/useAnchor"

const ANCHORS = Object.values(AnchorEnum)

const Navbar = () => {
  const {
    anchorElNav,
    navbarRef,
    heroSize,
    handleOpenNavMenu,
    handleCloseNavMenu,
    anchorNavigate,
  } = useAnchor()

  return (
    <ScrollTo threshold={heroSize} color={{ in: "white", out: "white" }}>
      <AppBar position="fixed" ref={navbarRef}>
        <Box mx={2}>
          <Toolbar disableGutters>
            {/* //* DESKTOP LOGO */}
            <Button
              onClick={() => anchorNavigate("top")}
              disableRipple
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                component={"img"}
                alt=""
                src={logo}
                height={24}
                sx={{ filter: "grayscale(.5)" }}
              />
            </Button>
            {/*  DESKTOP LOGO END */}
            {/* //* MOBILE  */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {ANCHORS.map((anchor) => (
                  <MenuItem key={anchor} onClick={() => anchorNavigate(anchor)}>
                    <Typography textAlign="center">{anchor}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              onClick={() => anchorNavigate("top")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                fontSize: ".8rem",
                color: "inherit",
                textDecoration: "none",
                gap: ".5rem",
              }}
            >
              CODE
              <Box
                component={"img"}
                alt=""
                src={logo}
                height={18}
                sx={{ filter: "grayscale(.5)", mr: 0.5 }}
              />
              NAMES
            </Typography>
            {/* MOBILE END */}
            {/*//* DESKTOP */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {ANCHORS.map((anchor) => (
                <Button
                  key={anchor}
                  onClick={() => anchorNavigate(anchor)}
                  color="light"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  {anchor}
                </Button>
              ))}
            </Box>
            {/* DESKTOP END */}
            {/*//* RIGHT SECTION MOBILE & DESKTOP */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Déconnexion" placement="left">
                <IconButton sx={{ p: 0 }}>
                  <PowerSettingsNew
                    color="light"
                    sx={{
                      ":hover": {
                        color: "error.main",
                        transition: "color 0.2s ease-in-out",
                      },
                      transition: "color 0.2s ease-in-out",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            {/* RIGHT SECTION MOBILE & DESKTOP END */}
          </Toolbar>
        </Box>
      </AppBar>
    </ScrollTo>
  )
}

export default Navbar
