import About from "@/components/about";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import {
  getCertificates,
  getExperiences,
  getFeaturedProjects,
  getProjectCategories,
  getSiteSettings,
  getSkills,
} from "@/sanity/lib/queries";



export default async function Home() {
  const [settings, experiences, skills, certificates, categories, featured] = await Promise.all([
    getSiteSettings(),
    getExperiences(),
    getSkills(),
    getCertificates(),
    getProjectCategories(),
    getFeaturedProjects(),
  ]);
  return (
    <main className="flex flex-col items-center px-4">
      <Intro settings={settings}/>
      <SectionDivider/>
      <About settings={settings}/>
      <Projects projects={categories} featured={featured}/>
      <Skills groups={skills}/>
      <Experience items={experiences}/>
      <Certificates items={certificates}/>
      <Contact email={settings?.contactEmail}/>
    </main>
  )
}
