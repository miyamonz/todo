import React from "react";
import type { PrimitiveAtom } from "jotai";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

import { useTable } from "react-table";
import type { Column } from "react-table";

type Data<T> = PrimitiveAtom<T>;
type Prop<T> = {
  atoms: PrimitiveAtom<T>[];
  columns: Column<Data<T>>[];
};

export function List<T>({
  atoms,
  columns,
}: Prop<T>): React.ReactElement<Prop<T>> {
  const newColumns = React.useMemo(
    () => [
      { id: "handle", Cell: () => <DragHandleIcon aria-label="drag" /> },
      ...columns,
    ],
    [columns.length]
  );
  const { getTableBodyProps, rows, prepareRow } = useTable({
    columns: newColumns,
    data: atoms,
  });

  return (
    <VStack {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <HStack {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <Box {...cell.getCellProps()}>{cell.render("Cell")}</Box>;
            })}
          </HStack>
        );
      })}
    </VStack>
  );
}

export default List;
