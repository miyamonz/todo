import React from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { splitAtom } from "jotai/utils";

import { useFilterAtom } from "./jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "./Task/TaskList";
import { newTask } from "./Task";

import { tasksAtom } from "./store";

import { fromUnixTime, isToday } from "date-fns";

function useAddTask() {
  const setTasks = useUpdateAtom(tasksAtom);
  const addTask = React.useCallback(() => {
    setTasks((prev) => [...prev, newTask()]);
  }, []);
  return addTask;
}

function Home() {
  return (
    <Tabs isLazy>
      <TabList position="sticky" top={0} zIndex="sticky" background="white">
        <Tab>today</Tab>
        <Tab>all</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskListToday />
        </TabPanel>
        <TabPanel>
          <TaskListAll />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function TaskListToday() {
  const filterToday = React.useCallback(
    (t) => isToday(fromUnixTime(t.created)),
    []
  );
  const [filteredAtoms, remove] = useFilterAtom(tasksAtom, filterToday);
  const addTask = useAddTask();

  return <TaskList taskAtoms={filteredAtoms} remove={remove} add={addTask} />;
}

function TaskListAll() {
  const [atoms, remove] = useAtom(splitAtom(tasksAtom));
  const addTask = useAddTask();

  return <TaskList taskAtoms={atoms} remove={remove} add={addTask} />;
}

export default Home;
