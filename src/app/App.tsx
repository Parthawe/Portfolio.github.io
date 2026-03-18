import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeContext } from '@/hooks/useTheme'
import { useThemeProvider } from '@/hooks/useTheme'
import { router } from './router'

export default function App() {
  const themeValue = useThemeProvider()

  return (
    <HelmetProvider>
      <ThemeContext.Provider value={themeValue}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </HelmetProvider>
  )
}
