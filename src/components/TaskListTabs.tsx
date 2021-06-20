import React from "react";

import { useFilterAtoms } from "../jotaiUtils/filterAtom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Box, VStack, Stack, Heading, Text } from "@chakra-ui/react";

import TaskList from "../Task/TaskList";
import type { PrimitiveAtom } from "jotai";
import type { Task, TaskProp } from "../Task/type";
type TaskAtoms = PrimitiveAtom<Task>[];

import {
  fromUnixTime,
  isSaturday,
  isSunday,
  isToday,
  isYesterday,
} from "date-fns";
import { lastDayOfWeek, isSameDay, add, format } from "date-fns";
import ja from "date-fns/locale/ja";

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
        <Tab>week</Tab>
        <Tab>all</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskListToday taskAtoms={taskAtoms} addTask={addTask} />
        </TabPanel>
        <TabPanel>
          <TaskListYesterday taskAtoms={taskAtoms} />
        </TabPanel>
        <TabPanel>
          <TaskListWeek taskAtoms={taskAtoms} />
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
function TaskListYesterday({ taskAtoms }: { taskAtoms: TaskAtoms }) {
  const filter = React.useCallback(
    (t: Task) => isYesterday(fromUnixTime(t.created)),
    []
  );
  const filteredAtoms = useFilterAtoms(taskAtoms, filter);

  return <TaskList taskAtoms={filteredAtoms} />;
}

const lastWeekOfToday = lastDayOfWeek(new Date(), {
  weekStartsOn: 1,
});

const days = [-6, -5, -4, -3, -2, -1, -0].map((minus) =>
  add(lastWeekOfToday, { days: minus })
);
function TaskListWeek({ taskAtoms }: { taskAtoms: TaskAtoms }) {
  const filter = React.useCallback((t: Task) => {
    const lastWeek = lastDayOfWeek(fromUnixTime(t.created), {
      weekStartsOn: 1,
    });
    return isSameDay(lastWeekOfToday, lastWeek);
  }, []);
  const filteredAtoms = useFilterAtoms(taskAtoms, filter);

  const dayAtoms = days.map((d) => {
    const filterByDay = React.useCallback((t: Task) => {
      return isSameDay(fromUnixTime(t.created), d);
    }, []);
    return [d, useFilterAtoms(filteredAtoms, filterByDay)] as const;
  });

  return (
    <Stack>
      {dayAtoms.map(([day, a]) => {
        const bg = isSaturday(day)
          ? "blue.100"
          : isSunday(day)
          ? "red.100"
          : "gray.100";
        return (
          <Stack key={day.toString()}>
            <Text fontSize="1xl" bg={bg} p="2">
              {format(day, "M/d E", { locale: ja })}
            </Text>
            <Box pl="4">
              <TaskList taskAtoms={a} />
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default TaskListTabs;
