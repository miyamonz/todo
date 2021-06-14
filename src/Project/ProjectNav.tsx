import React from "react";
import { useAtom } from "jotai";

import { Link, useRoute } from "wouter";
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
  const [match, params] = useRoute("/projects/:id");
  return (
    <Link key={project.id} href={`/projects/${project.id}`}>
      <Button
        colorScheme="orange"
        variant={match && params?.id == project.id ? "solid" : ""}
      >
        {project.title}
      </Button>
    </Link>
  );
}

export default ProjectList;
