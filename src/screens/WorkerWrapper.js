import React from "react"
import { MdDashboard, MdWorkspaces, MdClose } from "react-icons/md"
import {
  Flex,
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react"
import styled from "styled-components"
import NavLayout from "../components/layouts/NavLayout"
import { useMenu } from "../hooks/MenuProvider"

import { NavLink } from "react-router-dom"
// import './styles.css'

const StyledLogo = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Amita:wght@700&display=swap");
  cursor: pointer;
  font-family: "Amita", cursive;
  font-size: 28px;
  font-weight: 700;
`;

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
`;

const WorkerWrapper = ({ children }) => {
  // control displaying menu
  const drawer = useMenu()

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "21rem auto" }}>
      {/** Side bar menu */}
      <GridItem
        style={{ zIndex: "999", transition: "left 1s linear 0s" }}
        left={{
          base: `${drawer.isopen ? "0%" : "-100%"}`,
          md: "",
          lg: "0%",
        }}
        top={{ base: "0px", md: "", lg: "" }}
        position={{ base: "fixed", md: "fixed", lg: "relative" }}
        w={{ base: "27rem", md: "24rem", lg: "auto" }}>
        <Flex
          as="div"
          flexDir={"column"}
          bgColor="#FBFAFF"
          minHeight={"100vh"}
          pt="10"
          px="10"
          h={"100%"}>
          {/** logo and close icon */}
          <HStack alignItems="center" justify="space-between">
            <StyledLogo>PeepsDB</StyledLogo>
            <Show below="lg">
              <Box
                fontSize="3xl"
                cursor="pointer"
                onClick={() => drawer.setMenuStatus(false)}>
                <MdClose />
              </Box>
            </Show>
          </HStack>
          {/** ___ */}
          <Flex flexDir={"column"} align="start" gap="30px" mt={"30px"}>
            <StyledNavContainer>
              <NavLink exact to="/">
                <Flex gap={"10px"} align="center" cursor={"pointer"}>
                  <MdDashboard />
                  <Text fontSize={"14px"} fontWeight="600" color="#6D64FA">
                    Dashboard
                  </Text>
                </Flex>
              </NavLink>
            </StyledNavContainer>

            <StyledNavContainer>
              <NavLink to="/worker/workspaces?activity=all">
                <Flex gap={"5px"} align="center" cursor={"pointer"}>
                  <MdWorkspaces />
                  <Text fontSize={"14px"} fontWeight="600" color="#676464">
                    Workspaces
                  </Text>
                </Flex>
              </NavLink>
            </StyledNavContainer>
          </Flex>
        </Flex>
      </GridItem>
      {/** past body contents to navbar */}
      <GridItem px="10">
        <Box>
          <NavLayout title={"Users"}>{children}</NavLayout>
        </Box>
      </GridItem>
    </Grid>
  )
}

export default WorkerWrapper
