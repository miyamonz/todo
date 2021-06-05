import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai/optics";

import { Container, Heading } from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TasksList from "./TasksList";
import type { Task } from "./Task";

import { jsonAtom } from "./indexedDB";
import { setGist } from "./gist";

import debounce from "just-debounce-it";

import { fromUnixTime, set } from "date-fns";
import { isToday } from "date-fns";

const _setGist = debounce((arg: any) => setGist(arg), 100);

const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));

function useAddTask() {
  const [, setTasks] = useAtom(tasksAtom);
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return addTask;
}

const datesAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const dates = tasks.map((task) => fromUnixTime(task.updated));

  const datesWithoutTime = dates.map((d) =>
    set(d, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  );
  return datesWithoutTime.filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
});

function App() {
  const [json] = useAtom(jsonAtom);
  useEffect(() => {
    _setGist(json);
  }, [json]);

  const addTask = useAddTask();

  const [dates] = useAtom(datesAtom);
  return (
    <Container maxW={"5xl"}>
      <Heading>todo</Heading>
      <Tabs>
        <TabList position="sticky" top={0} zIndex="sticky" background="white">
          <Tab>today</Tab>
          <Tab>not done</Tab>
          <Tab>done</Tab>
          <Tab>all</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TasksList
              tasksAtom={tasksAtom}
              filter={(t) => isToday(fromUnixTime(t.created))}
              addTask={addTask}
            />
          </TabPanel>
          <TabPanel>
            <TasksList
              tasksAtom={tasksAtom}
              filter={(t) => !t.done}
              addTask={addTask}
            />
          </TabPanel>
          <TabPanel>
            <TasksList
              tasksAtom={tasksAtom}
              filter={(t) => t.done}
              addTask={(t) => addTask({ ...t, done: true })}
            />
          </TabPanel>
          <TabPanel>
            <TasksList tasksAtom={tasksAtom} addTask={addTask} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default App;
