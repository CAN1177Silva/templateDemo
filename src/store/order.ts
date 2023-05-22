import { useState } from 'react'

export default () => {
  const [count, setCount] = useState<number>(1)

  return { count, setCount }
}
