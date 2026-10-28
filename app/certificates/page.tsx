import BackBtn from '@/components/back-btn'
import CertificatesGrid from '@/components/certificates-grid'
import SectionHeading from '@/components/section-heading'
import { getCertificates } from '@/sanity/lib/queries'

export default async function CertificatesPage() {
  const items = await getCertificates()
  return (
    <div className='w-full max-w-[72rem] px-4'>
    <SectionHeading>Certificates & Diplomas</SectionHeading>
    <div className='flex justify-end mr-4 sm:mr-36'>
    <BackBtn/>
    </div>
    <CertificatesGrid items={items}/>
    </div>
  )
}
