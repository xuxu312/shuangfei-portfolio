import { HomeContent } from "../components/HomeContent";
import { projects } from "../data/projects";
import { shares } from "../data/shares";
import { getToolCards } from "../lib/tool-cards";
import { about, contact, intro, siteNavigation } from "../data/site";
import { getFeaturedCards } from "../lib/projects";
import { pageMetadata } from "../lib/metadata";

const featured = getFeaturedCards(projects);

export function meta() {
  return pageMetadata(`${intro.name}｜作品与探索`, intro.description, featured[0]?.cover, "/");
}

export default function Home() {
  return <HomeContent intro={intro} projects={featured} tools={getToolCards(projects)} shares={shares} about={about} contact={contact} navigation={siteNavigation} />;
}
