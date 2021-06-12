import {
  As,
  Button,
  ButtonProps,
  Icon,
  Spacer,
  Stack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";

import React, { FC } from "react";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import ProjectList from "./Project/ProjectList";
import { usePath } from "./route";

const NaviLink: FC<
  {
    isActive: boolean;
    activeIcon: As<any>;
    inactiveIcon: As<any>;
    children: string;
  } & ButtonProps
> = ({ isActive, activeIcon, inactiveIcon, ...props }) => {
  const isCollapse = useBreakpointValue({ base: true, xl: false });
  const icon = isActive ? activeIcon : inactiveIcon;
  const color = isActive ? "blue.500" : "black";
  if (isCollapse) {
    const { children, ...iconButtonProps } = props;
    return (
      <IconButton
        as="a"
        size={"lg"}
        variant="ghost"
        aria-label={children}
        fontSize={"2xl"}
        w={12}
        h={12}
        color={color}
        icon={<Icon as={icon} />}
        {...iconButtonProps}
      />
    );
  }
  return (
    <Button
      as="a"
      size={"lg"}
      fontSize={"xl"}
      variant="ghost"
      justifyContent="start"
      iconSpacing={4}
      color={color}
      leftIcon={<Icon as={icon} />}
      {...props}
    />
  );
};

export const Navi: FC<{}> = () => {
  const [, setPath] = usePath();
  return (
    <Stack
      w={{ base: 20, xl: 200 }}
      h="100vh"
      pb={4}
      alignItems={{ base: "center", xl: "start" }}
      spacing={1}
      px={{ base: 0, xl: 4 }}
    >
      <NaviLink
        isActive={true}
        activeIcon={HiHome}
        inactiveIcon={HiOutlineHome}
        onClick={() => setPath("/")}
      >
        ホーム
      </NaviLink>
      <ProjectList />
      <Spacer />
    </Stack>
  );
};
