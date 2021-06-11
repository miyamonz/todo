import React from "react";
import { useAtom } from "jotai";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "./TaskList";
import type { Task } from "./Task";

import { tasksAtom } from "./store";

import { fromUnixTime, isToday } from "date-fns";

function useAddTask() {
  const [, setTasks] = useAtom(tasksAtom);
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };
  return addTask;
}

function Home() {
  const addTask = useAddTask();

  return (
    <Tabs>
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
            filter={(t) => isToday(fromUnixTime(t.created))}
            addTask={addTask}
          />
        </TabPanel>
        <TabPanel>
          <TaskList
            tasksAtom={tasksAtom}
            filter={(t) => !t.done}
            addTask={addTask}
          />
        </TabPanel>
        <TabPanel>
          <TaskList
            tasksAtom={tasksAtom}
            filter={(t) => t.done}
            addTask={(t) => addTask({ ...t, done: true })}
          />
        </TabPanel>
        <TabPanel>
          <TaskList tasksAtom={tasksAtom} addTask={addTask} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Home;
