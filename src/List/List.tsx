import React from "react";
import type { PrimitiveAtom } from "jotai";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

import { useTable } from "react-table";
import type { Column } from "react-table";

import { List as MovableList, arrayMove } from "react-movable";

type Data<T> = PrimitiveAtom<T>;
type Prop<T> = {
  atoms: PrimitiveAtom<T>[];
  columns: Column<Data<T>>[];
  onChange: (from: PrimitiveAtom<T>, to: PrimitiveAtom<T>) => void;
};

export function List<T>({
  atoms,
  columns,
  onChange,
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
    <MovableList
      values={rows}
      onChange={({ oldIndex, newIndex }) => {
        const from = atoms[oldIndex];
        const to = atoms[newIndex];
        onChange(from, to);
      }}
      renderList={({ children, props }) => (
        <VStack {...getTableBodyProps()} {...props}>
          {children}
        </VStack>
      )}
      renderItem={({ value, props }) => {
        const row = value;
        prepareRow(row);
        return (
          <HStack {...row.getRowProps()} {...props}>
            {row.cells.map((cell) => {
              return <Box {...cell.getCellProps()}>{cell.render("Cell")}</Box>;
            })}
          </HStack>
        );
      }}
    />
  );
}

export default List;
