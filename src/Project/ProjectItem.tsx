import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";

import { HStack, Button, Text } from "@chakra-ui/react";

import type { Project } from "./type";
type ProjectAtom = PrimitiveAtom<Project>;

const ProjectItem: React.FC<{ projectAtom: ProjectAtom }> = ({
  projectAtom,
}) => {
  const [project, setProject] = useAtom(projectAtom);

  return (
    <HStack>
      <Button w="100%" bg={"white.300"} color={"black.300"} fontSize={"xl"}>
        {project.title}
      </Button>
    </HStack>
  );
};

export default ProjectItem;
