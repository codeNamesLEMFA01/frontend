import { MouseEvent, useEffect, useRef, useState } from "react"

const useAnchor = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const navbarRef = useRef<null | HTMLElement>(null)
  const [heroSize, setHeroSize] = useState<number>()
  const countStart = useRef(0)

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
    if (countStart.current === 0) {
      handleScroll()
      countStart.current = 1
      return
    }
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("resize", handleScroll)
    }
  }, [navbarRef, setHeroSize])
  return {
    anchorElNav,
    anchorElUser,
    navbarRef,
    heroSize,
    setHeroSize,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    anchorNavigate,
  }
}

export default useAnchor
