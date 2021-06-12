import React from "react";

import { useFilterAtoms } from "../jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import TaskList from "../Task/TaskList";
import type { PrimitiveAtom } from "jotai";
import type { Task, TaskProp } from "../Task/type";
type TaskAtoms = PrimitiveAtom<Task>[];

import { fromUnixTime, isToday, isYesterday } from "date-fns";

function TaskListTabs({
  taskAtoms,
  addTask,
}: {
  taskAtoms: TaskAtoms;
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
          <TaskListToday taskAtoms={taskAtoms} addTask={addTask} />
        </TabPanel>
        <TabPanel>
          <TaskListPrev taskAtoms={taskAtoms} />
        </TabPanel>
        <TabPanel>
          <TaskList taskAtoms={taskAtoms} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function TaskListToday({
  taskAtoms,
  addTask,
}: {
  taskAtoms: TaskAtoms;
  addTask: (prop: TaskProp) => void;
}) {
  const filterToday = React.useCallback(
    (t: Task) => isToday(fromUnixTime(t.created)),
    []
  );
  const filteredAtoms = useFilterAtoms(taskAtoms, filterToday);

  return (
    <TaskList taskAtoms={filteredAtoms} add={() => addTask({ text: "" })} />
  );
}
function TaskListPrev({ taskAtoms }: { taskAtoms: TaskAtoms }) {
  const filter = React.useCallback(
    (t: Task) => isYesterday(fromUnixTime(t.created)),
    []
  );
  const filteredAtoms = useFilterAtoms(taskAtoms, filter);

  return <TaskList taskAtoms={filteredAtoms} />;
}

export default TaskListTabs;
