import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai/optics";
import "./App.css";
import { Heading } from "@chakra-ui/react";
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import TasksList from "./TasksList";

import { jsonAtom } from "./indexedDB";
import { setGist } from "./gist";

import debounce from "just-debounce-it";

import { fromUnixTime, set } from "date-fns";

const _setGist = debounce((arg: any) => setGist(arg), 100);

const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));

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

  const [dates] = useAtom(datesAtom);
  return (
    <Box className="App">
      <header className="App-header">
        <Heading>todo</Heading>
        <Tabs>
          <TabList>
            <Tab>today</Tab>
            <Tab>done</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TasksList tasksAtom={tasksAtom} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </header>
    </Box>
  );
}

export default App;
