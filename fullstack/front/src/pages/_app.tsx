
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@/contexts/auth.contexts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <UserProvider>
          <ToastContainer/>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
      
    
    </>

  )
}

