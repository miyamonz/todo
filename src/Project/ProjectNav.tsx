import React from "react";
import { useAtom } from "jotai";
import ProjectItem from "./ProjectItem";

import { Link } from "wouter";
import { projectsAtom } from "../store";
import { splitAtom } from "jotai/utils";

import { Stack, Heading, Button } from "@chakra-ui/react";

const projectAtomsAtom = splitAtom(projectsAtom);

type Prop = {};
const ProjectList: React.FC<Prop> = ({}) => {
  const [projectAtoms] = useAtom(projectAtomsAtom);

  return (
    <Stack>
      <Heading size="sm">projects</Heading>
      {projectAtoms.map((projectAtom) => {
        return <ProjectItem key={`${projectAtom}`} projectAtom={projectAtom} />;
      })}
      <Link href="/projects">
        <Button>edit</Button>
      </Link>
    </Stack>
  );
};

export default ProjectList;
