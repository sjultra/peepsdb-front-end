import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import useAuthActions from "../../hooks/useAuth";
import { useMenu } from "../../hooks/MenuProvider";
import { FiMenu } from "react-icons/fi";
import { HStack,Stack, Show, Box } from "@chakra-ui/react";

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
          <Box color="var(--primary-color)">
          <Link to="/">
            {"PeepsDB"}
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
