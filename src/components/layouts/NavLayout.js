import React from "react";
import { SiHomeadvisor } from "react-icons/si";

import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import useAuthActions from "../../hooks/useAuth";
import { useMenu } from "../../hooks/MenuProvider";
import { FiMenu } from "react-icons/fi";
import { HStack,Stack, Show, Box, Text } from "@chakra-ui/react";

const NavLayout = ({
  boxShadow,
  className,
  children,
  rest,
  noPadding,
  title,
  displayAsidebar = true
}) => {
  // control displaying menu
  const drawer = useMenu();
  // Selectors
  const { auth } = useAuthActions();
  const { isAuthenticated } = auth || {};

  return (
    <>
      <Stack
        alignItems="center"
        justify="space-between"
        direction="row"
        py="6"
        >
        <HStack gap="4">
          <Show below="lg">
            <Box display={`${displayAsidebar?"":"none"}`} onClick={() => drawer.setMenuStatus(true)} cursor="pointer">
              <FiMenu />
            </Box>
          </Show>
          <Box color="var(--primary-color)" fontSize={14}>
          <Link to="/">
            <Stack direction="row" alignItems="center">
            <SiHomeadvisor />
            <Text fontWeight="semibold"> {"Go Home"} </Text>
          </Stack>
          </Link>
          </Box>
        </HStack>
        <Box>{isAuthenticated && auth && <UserDropdown user={auth} />}</Box>
      </Stack>
      {children}
    </>
  );
};

export default NavLayout
