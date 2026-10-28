import BackBtn from '@/components/back-btn'
import SectionHeading from '@/components/section-heading'
import React from 'react'

function Cyber() {
  return (
  <div>
    <SectionHeading>Cyber Security Projects</SectionHeading>
    <div className='flex justify-end mr-4 sm:mr-36'>
    <BackBtn location='/#projects'/>
    </div>
    </div>
  )
}

export default Cyber