import BackBtn from '@/components/back-btn'
import ProjectGrid from '@/components/project-grid'
import SectionHeading from '@/components/section-heading'
import { getProjectsByCategory } from '@/sanity/lib/queries'

export default async function Mobile() {
  const items = await getProjectsByCategory('mobile')
  return (
    <div>
    <SectionHeading>Mobile Projects</SectionHeading>
    <div className='flex justify-end mr-4 sm:mr-36'>
    <BackBtn location='/#projects'/>
    </div>
    <ProjectGrid items={items}/>
    </div>
  )
}
