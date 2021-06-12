import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import { useUpdateAtom, splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import { filterAtom } from "../jotaiUtils/filterAtom";
import { Stack, Button } from "@chakra-ui/react";
import { Box, HStack, Table, Tbody, Tr, Td } from "@chakra-ui/react";

import { useTable } from "react-table";

import { newTask } from "./";
import { ListTextarea } from "../components/ListTextarea";
import type { Task } from "./type";

type SetStateAction<Value> = Value | ((prev: Value) => Value);
type TasksAtom = WritableAtom<Task[], SetStateAction<Task[]>>;

const identity = (a: unknown) => a;

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

  const [taskAtoms, remove] = useAtom(taskAtomsAtom);
  const [filteredAtoms] = useAtom(
    filterAtom(taskAtoms, React.useCallback(filter, []))
  );

  const columns = React.useMemo(
    () => [
      {
        id: "name",
        accessor: identity,
        Cell: ({ value }) => {
          const [task, setTask] = useAtom(value as PrimitiveAtom<Task>);
          return (
            <ListTextarea
              value={task.text}
              done={task.done}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          );
        },
      },
      {
        id: "done",
        accessor: identity,
        Cell: ({ value }) => {
          const doneAtom = focusAtom(value as PrimitiveAtom<Task>, (optic) =>
            optic.prop("done")
          );
          const setDone = useUpdateAtom(doneAtom);
          return <Button onClick={() => setDone((prev) => !prev)}>done</Button>;
        },
      },
      {
        id: "remove",
        accessor: identity,
        Cell: ({ value }) => <Button onClick={() => remove(value)}>x</Button>,
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
