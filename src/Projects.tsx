import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { splitAtom } from "jotai/utils";

import { useFilterAtom } from "./jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

//import TaskList from "./Task/TaskList";

import { projectsAtom } from "./store";

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

function ProjectListCurr() {
  const filterToday = React.useCallback((t) => true, []);
  const [filteredAtoms, remove] = useFilterAtom(projectsAtom, filterToday);

  return <TaskList atoms={filteredAtoms} remove={remove} add={() => {}} />;
}

function ProjectListArchived() {
  const [atoms, remove] = useAtom(splitAtom(projectsAtom));

  return <TaskList atoms={atoms} remove={remove} add={() => {}} />;
}

export default Projects;
