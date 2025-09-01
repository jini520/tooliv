import { useState } from 'react'
import { Button, ThemeToggle, useTheme } from '@tooliv/ui'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { mode } = useTheme()

  return (
    <div className="app">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid var(--theme-color-border-primary)'
      }}>
        <h1>Tooliv App</h1>
        <ThemeToggle showLabel size="md" />
      </header>
      
      <main style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p>현재 테마: <strong>{mode === 'light' ? '라이트' : '다크'}</strong></p>
        </div>
        
        <Button>Click me</Button>
        
        <div style={{ marginTop: '2rem' }}>
          <p>카운터: {count}</p>
          <Button onClick={() => setCount(count + 1)}>증가</Button>
        </div>
      </main>
    </div>
  )
}

export default App
