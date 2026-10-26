import { Header } from "./Header";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { About } from "./About";
import { Contact } from "./Contact";
import { Tools } from "./Tools";
import { Sharing } from "./Sharing";
import type { IntroContent, ProjectPreview } from "../types/preview";
import type { AboutContent, ContactContent, NavigationItem, Share, ToolCardContent } from "../types/content";

interface HomeContentProps {
  intro: IntroContent;
  projects: ProjectPreview[];
  about?: AboutContent;
  contact?: ContactContent;
  navigation?: NavigationItem[];
  tools?: ToolCardContent[];
  shares?: Share[];
}

export function HomeContent({ intro, projects, about, contact, navigation, tools, shares }: HomeContentProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header name={intro.name} navigation={navigation} />
      <main id="main-content" className="page-shell">
        <Hero intro={intro} />
        <Projects projects={projects} />
        {tools && <Tools items={tools} />}
        {shares && <Sharing items={shares} />}
        {about && <About content={about} />}
        {contact && <Contact content={contact} />}
      </main>
    </>
  );
}
