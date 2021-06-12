import React from "react";
import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";

import { useFilterAtom } from "../jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "../Task/TaskList";
import type { PrimitiveAtom } from "jotai";
import type { Task, TaskProp } from "../Task/type";
type TasksAtom = PrimitiveAtom<Task[]>;

import { fromUnixTime, isToday, isYesterday } from "date-fns";

function TaskListTabs({
  tasksAtom,
  addTask,
}: {
  tasksAtom: TasksAtom;
  addTask: (prop: TaskProp) => void;
}) {
  return (
    <Tabs isLazy>
      <TabList position="sticky" top={0} zIndex="sticky" background="white">
        <Tab>today</Tab>
        <Tab>yesterday</Tab>
        <Tab>all</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskListToday tasksAtom={tasksAtom} addTask={addTask} />
        </TabPanel>
        <TabPanel>
          <TaskListPrev tasksAtom={tasksAtom} />
        </TabPanel>
        <TabPanel>
          <TaskListAll tasksAtom={tasksAtom} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function TaskListToday({
  tasksAtom,
  addTask,
}: {
  tasksAtom: TasksAtom;
  addTask: (prop: TaskProp) => void;
}) {
  const filterToday = React.useCallback(
    (t: Task) => isToday(fromUnixTime(t.created)),
    []
  );
  const [filteredAtoms, remove] = useFilterAtom(tasksAtom, filterToday);

  return (
    <TaskList taskAtoms={filteredAtoms} add={() => addTask({ text: "" })} />
  );
}
function TaskListPrev({ tasksAtom }: { tasksAtom: TasksAtom }) {
  const filter = React.useCallback(
    (t) => isYesterday(fromUnixTime(t.created)),
    []
  );
  const [filteredAtoms, remove] = useFilterAtom(tasksAtom, filter);

  return <TaskList taskAtoms={filteredAtoms} />;
}

function TaskListAll({ tasksAtom }: { tasksAtom: TasksAtom }) {
  const [atoms, remove] = useAtom(splitAtom(tasksAtom));

  return <TaskList taskAtoms={atoms} />;
}

export default TaskListTabs;
