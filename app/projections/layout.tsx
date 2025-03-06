import { Metadata } from "next"
import ProjectionsPage from "./page"

export const metadata: Metadata = {
  title: "Projections | Next Sports App",
  description: "View and analyze player projections",
}

export default function ProjectionsLayout() {
  return <ProjectionsPage />
} 