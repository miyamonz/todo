import React from "react";
import { useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { filterAtom } from "../jotaiUtils/filterAtom";
import { Stack, Button } from "@chakra-ui/react";
import { Box, HStack, Table, Tbody, Tr, Td } from "@chakra-ui/react";

import { useTable } from "react-table";

import { newTask, TaskItem } from "./";
import { TaskName, TaskDone, TaskRemove } from "./TaskItem";
import type { Task } from "./type";

type SetStateAction<Value> = Value | ((prev: Value) => Value);
type TasksAtom = WritableAtom<Task[], SetStateAction<Task[]>>;

type Prop = {
  tasksAtom: TasksAtom;
  filter?: (task: Task) => boolean;
  addTask: (task: Task) => void;
};
const TaskList: React.FC<Prop> = ({
  tasksAtom,
  filter = () => true,
  addTask,
}) => {
  const taskAtomsAtom = splitAtom(tasksAtom);

  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const [filteredAtoms] = useAtom(
    filterAtom(taskAtoms, React.useCallback(filter, []))
  );

  const columns = React.useMemo(
    () => [
      {
        id: "name",
        accessor: (row) => row,
        Cell: ({ value }) => <TaskName taskAtom={value} />,
      },
      {
        id: "done",
        accessor: (row) => row,
        Cell: ({ value }) => <TaskDone taskAtom={value} />,
      },
      {
        id: "remove",
        accessor: (row) => row,
        Cell: ({ value }) => (
          <TaskRemove taskAtom={value} remove={() => removeTask(value)} />
        ),
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredAtoms,
    });

  return (
    <Stack>
      <Table {...getTableProps()}>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                <Td p="2">
                  <HStack>
                    {row.cells.map((cell) => {
                      return (
                        <Box {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Box>
                      );
                    })}
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button onClick={() => addTask(newTask())}>add</Button>
    </Stack>
  );
};

export default TaskList;
