import React from "react"
import { SiHomeadvisor } from "react-icons/si"

import { Link } from "react-router-dom"
import UserDropdown from "./UserDropdown"
import useAuthActions from "../../hooks/useAuth"
import { useMenu } from "../../hooks/MenuProvider"
import { CgMenuRightAlt } from "react-icons/cg"
import { HStack, Stack, Show, Box, Text, Flex } from "@chakra-ui/react"

const NavLayout = ({ children, displayAsidebar = true }) => {
  // control displaying menu
  const drawer = useMenu()
  // Selectors
  const { auth } = useAuthActions()
  const { isAuthenticated } = auth || {}

  return (
    <>
      <Stack alignItems="center" justify="space-between" direction="row" py="6">
        <HStack gap="4">
          <Box color="var(--primary-color)" fontSize={14}>
            <Link to="/">
              <Stack direction="row" alignItems="center">
                <SiHomeadvisor />
                <Text fontWeight="semibold"> {"Go Home"} </Text>
              </Stack>
            </Link>
          </Box>
        </HStack>
        <Box>
          <Flex align="center" gap="4">
            {isAuthenticated && auth && <UserDropdown user={auth} />}
            <Show below="lg">
              <Box
                display={`${displayAsidebar ? "" : "none"}`}
                onClick={() => drawer.setMenuStatus((_prev) => !_prev)}
                cursor="pointer"
              >
                <CgMenuRightAlt fontSize={"3rem"} />
              </Box>
            </Show>
          </Flex>
        </Box>
      </Stack>
      {children}
    </>
  )
}

export default NavLayout
