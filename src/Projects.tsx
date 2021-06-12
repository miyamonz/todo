import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { splitAtom } from "jotai/utils";

import { useFilterAtoms } from "./jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import ProjectList from "./Project/ProjectList";
import { newProject } from "./Project/type";

import { projectsAtom } from "./store";
const projectAtomsAtom = splitAtom(projectsAtom);

function Projects() {
  return (
    <Tabs isLazy>
      <TabList position="sticky" top={0} zIndex="sticky" background="white">
        <Tab>projects</Tab>
        <Tab>archived</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProjectListCurr />
        </TabPanel>
        <TabPanel>
          <ProjectListArchived />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function useAddProject() {
  const set = useUpdateAtom(projectsAtom);
  const add = React.useCallback(() => {
    set((prev) => [...prev, newProject("")]);
  }, []);
  return add;
}

function ProjectListCurr() {
  const [projectAtoms, remove] = useAtom(projectAtomsAtom);
  const filterToday = React.useCallback((t) => true, []);
  const filteredAtoms = useFilterAtoms(projectAtoms, filterToday);

  const add = useAddProject();

  return <ProjectList atoms={filteredAtoms} remove={remove} add={add} />;
}

function ProjectListArchived() {
  const [atoms, remove] = useAtom(splitAtom(projectsAtom));

  const add = useAddProject();
  return <ProjectList atoms={atoms} remove={remove} add={add} />;
}

export default Projects;
