import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import { List } from "../List/List";
import { Stack, Button } from "@chakra-ui/react";

import type { Column, CellProps } from "react-table";

import { ListTextarea } from "../components/ListTextarea";
import type { Task } from "./type";

const identity = (a: unknown) => a;

type Prop = {
  taskAtoms: PrimitiveAtom<Task>[];
  remove: (item: PrimitiveAtom<Task>) => void;
  add: () => void;
};

const TaskList: React.FC<Prop> = ({ taskAtoms, remove, add }) => {
  type Data = PrimitiveAtom<Task>;
  type Value = PrimitiveAtom<Task>;

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        id: "name",
        accessor: identity,
        Cell: ({ value }: CellProps<Data, Value>) => {
          const [task, setTask] = useAtom(value);
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
        Cell: ({ value }: CellProps<Data, Value>) => {
          const doneAtom = focusAtom(value, (optic) => optic.prop("done"));
          const setDone = useUpdateAtom(doneAtom);
          return <Button onClick={() => setDone((prev) => !prev)}>done</Button>;
        },
      },
      {
        id: "remove",
        accessor: identity,
        Cell: ({ value }: CellProps<Data, Value>) => (
          <Button onClick={() => remove(value)}>x</Button>
        ),
      },
    ],
    []
  );

  return (
    <Stack>
      <List atoms={taskAtoms} columns={columns} />
      <Button onClick={() => add()}>add</Button>
    </Stack>
  );
};

export default TaskList;
