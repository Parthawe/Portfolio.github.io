import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function PdfPage() {
  return (
    <>
      <Helmet>
        <title>Parth - PDF Portfolio</title>
      </Helmet>

      <Nav />

      <main id="main-content">
        <div id="flipbookContainer" style={{ width: '100%', height: '1000px' }} />
      </main>

      <Footer />
    </>
  )
}
