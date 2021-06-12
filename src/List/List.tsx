import React from "react";
import type { PrimitiveAtom } from "jotai";
import { Box, HStack, Table, Tbody, Tr, Td } from "@chakra-ui/react";

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
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data: atoms,
  });

  return (
    <Table {...getTableProps()}>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              <Td p="2">
                <HStack>
                  {row.cells.map((cell) => {
                    return (
                      <Box {...cell.getCellProps()}>{cell.render("Cell")}</Box>
                    );
                  })}
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default List;
