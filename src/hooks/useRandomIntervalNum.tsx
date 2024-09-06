import { useEffect, useState } from "react"

interface IProps {
  stopCondition: boolean
  min: number
  max: number
}

const useRandomIntervalNum = ({ stopCondition, min, max }: IProps) => {
  const [num, setNum] = useState(0)
  function randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    if (stopCondition) return

    setNum(randomNum(min, max))

    const interval = setInterval(() => {
      setNum(randomNum(min, max))
    }, 100)

    return () => clearInterval(interval)
  }, [max, min, stopCondition])
  return { num }
}

export default useRandomIntervalNum
