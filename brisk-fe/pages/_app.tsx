import '../styles/globals.css'
import '../styles/output.css'
import '../styles/App.css'
import '../styles/chat_index.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
