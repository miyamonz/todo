import React from "react";
import { useUpdateAtom } from "jotai/utils";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "./Task/TaskList";
import type { Task } from "./Task";

import { tasksAtom } from "./store";

import { fromUnixTime, isToday } from "date-fns";

function useAddTask() {
  const setTasks = useUpdateAtom(tasksAtom);
  const addTask = React.useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);
  return addTask;
}

function Home() {
  const addTask = useAddTask();

  const filterToday = React.useCallback(
    (t) => isToday(fromUnixTime(t.created)),
    []
  );

  return (
    <Tabs isLazy>
      <TabList position="sticky" top={0} zIndex="sticky" background="white">
        <Tab>today</Tab>
        <Tab>not done</Tab>
        <Tab>done</Tab>
        <Tab>all</Tab>
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
        <TabPanel>
          <TaskList
            tasksAtom={tasksAtom}
            filter={React.useCallback((t) => t.done, [])}
            addTask={React.useCallback(
              (t) => addTask({ ...t, done: true }),
              []
            )}
          />
        </TabPanel>
        <TabPanel>
          <TaskList tasksAtom={tasksAtom} addTask={addTask} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default React.memo(Home);
