import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import { List } from "../List/List";
import { Stack, Button } from "@chakra-ui/react";

import type { Column, CellProps } from "react-table";

import { ListTextarea } from "../components/ListTextarea";
import type { Project } from "./type";

const identity = (a: unknown) => a;

type Prop = {
  atoms: PrimitiveAtom<Project>[];
  remove: (item: PrimitiveAtom<Project>) => void;
  add: () => void;
};

const ProjectList: React.FC<Prop> = ({ atoms, remove, add }) => {
  type Data = PrimitiveAtom<Project>;
  type Value = PrimitiveAtom<Project>;

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        id: "name",
        accessor: identity,
        Cell: ({ value }: CellProps<Data, Value>) => {
          const [task, set] = useAtom(value);
          return (
            <ListTextarea
              value={task.title}
              done={false}
              onChange={(e) =>
                set((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          );
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
      <List atoms={atoms} columns={columns} />
      <Button onClick={() => add()}>add</Button>
    </Stack>
  );
};

export default ProjectList;
