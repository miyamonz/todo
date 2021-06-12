import React from "react";
import { useAtom } from "jotai";

import { Link } from "wouter";
import { projectsAtom } from "../store";
import { splitAtom } from "jotai/utils";

import { Stack, Heading, Button } from "@chakra-ui/react";
import type { ProjectAtom } from "./type";

const projectAtomsAtom = splitAtom(projectsAtom);

type Prop = {};
const ProjectList: React.FC<Prop> = ({}) => {
  const [projectAtoms] = useAtom(projectAtomsAtom);

  return (
    <Stack>
      <Heading size="sm">projects</Heading>
      {projectAtoms.map((projectAtom) => (
        <ProjectItem key={`${projectAtom}`} atom={projectAtom} />
      ))}
      <Link href="/projects">
        <Button>edit</Button>
      </Link>
    </Stack>
  );
};

function ProjectItem({ atom }: { atom: ProjectAtom }) {
  const [project] = useAtom(atom);
  return (
    <Link key={project.id} href={`/projects/${project.id}`}>
      <Button w="100%" bg={"white.300"} color={"black.300"} fontSize={"xl"}>
        {project.title}
      </Button>
    </Link>
  );
}

export default ProjectList;
