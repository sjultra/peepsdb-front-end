import React from "react"
import { MdSpaceDashboard, MdWorkspaces, MdClose } from "react-icons/md"
import { BsUiChecks } from "react-icons/bs"
import { HiUsers } from "react-icons/hi"

import { Flex, HStack, Box, Text, Grid, GridItem, Show } from "@chakra-ui/react"
import styled from "styled-components"
import NavLayout from "./NavLayout"
import { useMenu } from "../../hooks/MenuProvider"

import { NavLink } from "react-router-dom"
// import './styles.css'

const StyledLogo = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Amita:wght@700&display=swap");
  cursor: pointer;
  font-family: "Amita", cursive;
  font-size: 28px;
  font-weight: 700;
`

const StyledNavContainer = styled.div`
  a {
    padding: 0.5em 0.8em;
    min-width: 155px;
    display: inherit;
    border-right: 5px solid transparent;
    &.active,
    &:hover {
      background: #fff;
      display: inherit;
      border-right: 5px solid #6d64fa;
      p {
        color: var(--primary-color);
      }
      svg {
        color: var(--primary-color);
      }
    }
    svg {
      color: #676464;
    }
  }
`

const AdminAsideBar = ({ children }) => {
  // control displaying menu
  const drawer = useMenu()

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "21rem auto" }}>
      {/** Side bar menu */}
      <GridItem
        style={{ zIndex: "999", transition: "left 0.5s linear 0s" }}
        left={{
          base: `${drawer.isopen ? "0%" : "-100%"}`,
          md: "",
          lg: "0%",
        }}
        top="0px"
        position={{ base: "fixed", md: "fixed", lg: "sticky" }}
        w={{ base: "27rem", md: "24rem", lg: "auto" }}
      >
        <Flex
          as="div"
          flexDir={"column"}
          bgColor="#fcfcfc"
          boxShadow="xs"
          minHeight={"100vh"}
          pt="10"
          px="10"
          h={"100%"}
        >
          {/** logo and close icon */}
          <HStack alignItems="center" justify="space-between">
            <StyledLogo>PeepsDB</StyledLogo>
            <Show below="lg">
              <Box
                fontSize="3xl"
                cursor="pointer"
                onClick={() => drawer.setMenuStatus((_prev) => !_prev)}
              >
                <MdClose />
              </Box>
            </Show>
          </HStack>
          {/** ___ */}
          <Flex flexDir={"column"} align="start" gap="10" mt={"12"}>
            <CustomRouteLink
              title={"Dashboard"}
              icon={<MdSpaceDashboard />}
              route={"/"}
            />
            <CustomRouteLink
              title={"Workspaces"}
              icon={<MdWorkspaces />}
              route={"/admin/workspaces"}
            />
            <CustomRouteLink
              title={"Audit Trail"}
              icon={<BsUiChecks />}
              route={"/admin/logs"}
            />
            <CustomRouteLink
              title={"Users"}
              icon={<HiUsers />}
              route={"/teams"}
            />
          </Flex>
        </Flex>
      </GridItem>
      {/** past body contents to navbar */}
      <GridItem px={["0", "4", "10"]}>
        <Box w="full">
          <NavLayout title={"Users"}>{children}</NavLayout>
        </Box>
      </GridItem>
    </Grid>
  )
}

// custom route link
const CustomRouteLink = ({ route, gap, title, icon }) => {
  // control displaying menu
  const drawer = useMenu()

  return (
    <>
      <StyledNavContainer>
        <NavLink
          exact
          to={`${route}`}
          onClick={() => drawer.setMenuStatus((_prev) => !_prev)}
        >
          <Flex gap={"5px"} align="center" cursor={"pointer"}>
            {icon}
            <Text fontSize={"14px"} fontWeight="600">
              {title}
            </Text>
          </Flex>
        </NavLink>
      </StyledNavContainer>
    </>
  )
}

export default AdminAsideBar
