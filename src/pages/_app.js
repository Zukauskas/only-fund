import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalProvider } from '@/contexts/Global'

export default function App ({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  )
}
