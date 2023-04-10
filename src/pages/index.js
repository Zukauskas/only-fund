
import Nav from '@/Components/Nav'
import Homepage from '@/Components/Homepage'
import Head from 'next/head'
import HeroBanner from '@/Components/HeroBanner'
import Footer from '@/Components/Footer'


export default function Home() {
  return (
    <>
      <Head>
        <title>OnlyFund | Get Money From People</title>
        <meta name="description" content="Project for educational purposes only" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <HeroBanner />
      <Homepage />
      <Footer />
    </>
  )
}
