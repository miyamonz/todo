import React from "react";
import type { PrimitiveAtom } from "jotai";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

import { useTable } from "react-table";
import type { Column } from "react-table";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              //style={getListStyle(snapshot.isDraggingOver)}
            >
              {rows.map((row, index) => {
                prepareRow(row);
                const key = row.original.toString();
                return (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                      >
                        <HStack {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <Box {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </Box>
                            );
                          })}
                        </HStack>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </VStack>
  );
}

export default List;
