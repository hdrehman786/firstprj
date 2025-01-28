import { useState } from 'react'
import Todo from './components/Todo.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Todo />
    </div>
  )
}

export default App
