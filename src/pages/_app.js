import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalProvider } from '@/contexts/Global'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Component { ...pageProps } />
      </GlobalProvider>
    </AuthProvider>
  )
}
