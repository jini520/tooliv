import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@tooliv/ui'
import App from './App.jsx'

// 개발 환경에서만 MSW Mocking Server 시작
if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ startMocking }) => {
    startMocking()
  }).catch((error) => {
    console.warn('MSW 로딩 실패:', error)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultMode="light">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
