import React, { ComponentProps } from "react";

import { Textarea } from "@chakra-ui/react";

type Prop = ComponentProps<typeof Textarea> & {
  value: string;
  done: boolean;
};
export const ListTextarea: React.FC<Prop> = (props) => {
  const { value, done, ...rest } = props;
  return (
    <Textarea
      value={value}
      w={800}
      rows={value.split("\n").length}
      bg={done ? "gray.300" : "white.300"}
      color={done ? "gray.600" : "black.300"}
      fontSize={done ? "sm" : "xl"}
      {...rest}
    />
  );
};
