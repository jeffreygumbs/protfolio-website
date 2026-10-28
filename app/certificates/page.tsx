import BackBtn from '@/components/back-btn'
import CertificatesGrid from '@/components/certificates-grid'
import SectionHeading from '@/components/section-heading'
import { getCertificates } from '@/sanity/lib/queries'

export default async function CertificatesPage() {
  const items = await getCertificates()
  return (
    <div className='mx-auto w-full max-w-6xl px-4'>
    <SectionHeading>Certificates & Diplomas</SectionHeading>
    <div className='mb-2 flex justify-end'>
    <BackBtn location='/#certificates'/>
    </div>
    <CertificatesGrid items={items}/>
    </div>
  )
}
