import { useEffect, useState } from "react"

interface IProps {
  stopCondition: boolean
}

const useRandomIntervalNames = ({ stopCondition }: IProps) => {
  const [name, setName] = useState("")
  function randomName() {
    const i = Math.floor(Math.random() * NAMES.length)
    return NAMES[i]
  }

  useEffect(() => {
    if (stopCondition) return

    setName(randomName)

    const interval = setInterval(() => {
      setName(randomName)
    }, 100)

    return () => clearInterval(interval)
  }, [stopCondition])
  return { name }
}

export default useRandomIntervalNames

// eslint-disable-next-line react-refresh/only-export-components
const NAMES = [
  "James",
  "Mary",
  "Rebecca",
  "Alex",
  "Eric",
  "Francis",
  "Carlos",
  "Lulu",
  "Lina",
  "Fred",
  "Ronald",
  "Francis",
  "Mattie",
  "Helen",
  "Arthur",
  "Mayme",
  "Joshua",
  "Max",
  "Laura",
  "Brian",
  "Carpenter",
  "Logan",
  "Kelley",
  "Watts",
  "Hammond",
  "Casey",
  "McCoy",
  "Osborne",
  "Pearson",
  "Stanley",
  "King",
  "Brown",
  "Robbins",
  "Lane",
  "McCoy",
  "Logan",
  "Bennett",
  "Nunez",
]
