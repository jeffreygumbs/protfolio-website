import BackBtn from '@/components/back-btn'
import ProjectGrid from '@/components/project-grid'
import SectionHeading from '@/components/section-heading'
import { getProjectsByCategory } from '@/sanity/lib/queries'

export default async function Website() {
  const items = await getProjectsByCategory('web')
  return (
    <div>
    <SectionHeading>Website Projects</SectionHeading>
    <div className='flex justify-end mr-4 sm:mr-36'>
    <BackBtn/>
    </div>
    <ProjectGrid items={items}/>
    </div>
  )
}
