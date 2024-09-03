import { MouseEvent, useEffect, useRef, useState } from "react"

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"

import logo from "@assets/logo.png"
import { Adb, Menu as MenuIcon } from "@mui/icons-material"

import { AnchorEnum } from "@src/types/common"

import ScrollTo from "./ScrollTo"

const settings = ["Profile", "Account", "Dashboard", "Logout"]
const ANCHORS = Object.values(AnchorEnum)

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [heroSize, setHeroSize] = useState(0)
  const navbarRef = useRef<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const anchorNavigate = (page: string) => {
    handleCloseNavMenu()
    const anchor = document.getElementById("anchor_" + page)
    if (!navbarRef.current) return
    if (anchor?.offsetTop === undefined) return
    const navbarHeight = navbarRef.current.clientHeight
    window.scrollTo({ top: anchor.offsetTop - navbarHeight, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero")
      const navHeight = navbarRef.current ? navbarRef.current.clientHeight : 0
      const height = heroEl ? heroEl.clientHeight - navHeight : 0
      setHeroSize(height)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <ScrollTo threshold={heroSize}>
      <AppBar position="fixed" ref={navbarRef} id="🎉">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              onClick={() => anchorNavigate("top")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {/* <Adb sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
              <Box
                component={"img"}
                alt=""
                src={logo}
                // width={"10vw"}
                height={24}
                sx={{ filter: "grayscale(.5) brightness(.8)" }}
              />
              {/* CODE NAMES */}
            </Typography>

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
                  <MenuItem key={anchor} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{anchor}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Adb sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#top"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            {/*//! DESKTOP */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {ANCHORS.map((anchor) => (
                // <Link href={"#anchor_" + anchor}>
                //   <Button key={anchor} sx={{ my: 2, color: "white", display: "block" }}>
                //     {anchor}
                //   </Button>
                // </Link>
                <Button
                  key={anchor}
                  onClick={() => anchorNavigate(anchor)}
                  sx={{ color: "white", display: "block" }}
                >
                  {anchor}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ScrollTo>
  )
}

export default Navbar
