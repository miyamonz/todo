import React from "react";
import { useUpdateAtom } from "jotai/utils";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "./Task/TaskList";
import type { Task } from "./Task";

import { projectsAtom } from "./store";

import { fromUnixTime, isToday } from "date-fns";

function useAddProject() {
  const set = useUpdateAtom(projectsAtom);
  const addTask = React.useCallback((project) => {
    set((prev) => [...prev, project]);
  }, []);
  return addTask;
}

function Home() {
  const addProject = useAddProject();

  const filterToday = React.useCallback(
    (t) => isToday(fromUnixTime(t.created)),
    []
  );

  return (
    <Tabs isLazy>
      <TabList position="sticky" top={0} zIndex="sticky" background="white">
        <Tab>current</Tab>
        <Tab>archived</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskList
            tasksAtom={tasksAtom}
            filter={filterToday}
            addTask={addTask}
          />
        </TabPanel>
        <TabPanel>
          <TaskList
            tasksAtom={tasksAtom}
            filter={React.useCallback((t: Task) => !t.done, [])}
            addTask={addTask}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default React.memo(Home);
