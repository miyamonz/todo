import React from "react";
import { useAtom } from "jotai";
import ProjectItem from "./ProjectItem";
import ProjectModal from "./ProjectModal";
import { Project, newProject } from "./type";

import { projectsAtom } from "../store";
import { splitAtom } from "jotai/utils";

import { Stack, Heading, Button } from "@chakra-ui/react";

const projectAtomsAtom = splitAtom(projectsAtom);

function useAddProject() {
  const [, set] = useAtom(projectsAtom);
  return (project: Project) => {
    set((prev) => [...prev, project]);
  };
}
type Prop = {};
const ProjectList: React.FC<Prop> = ({}) => {
  const [projectAtoms] = useAtom(projectAtomsAtom);
  const addProject = useAddProject();

  return (
    <Stack>
      <Heading size="sm">projects</Heading>
      {projectAtoms.map((projectAtom) => {
        return <ProjectItem key={`${projectAtom}`} projectAtom={projectAtom} />;
      })}
      <ProjectModal onAdd={(title) => addProject(newProject(title))} />
    </Stack>
  );
};

export default ProjectList;
