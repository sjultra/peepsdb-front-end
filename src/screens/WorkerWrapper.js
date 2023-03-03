

import React from 'react'
import { MdDashboard, MdWorkspaces } from 'react-icons/md';
import { HiUserGroup, } from 'react-icons/hi';
import { Flex, Box, Text, Grid, GridItem } from '@chakra-ui/react'
import styled from 'styled-components';
import NavLayout from '../components/layouts/NavLayout';
import { NavLink } from "react-router-dom";
import {TiDocumentText} from 'react-icons/ti'
// import './styles.css'

const StyledLogo = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Amita:wght@700&display=swap');
    cursor: pointer;
    font-family: 'Amita', cursive;
    font-size: 28px;
    font-weight: 700;
`

const StyledNavContainer = styled.div`

    a{
        padding:0.5em 0.8em;
        min-width:155px;
        display:inherit;        
        border-right:5px solid transparent;
        &.active,&:hover{
            background:#FFF; 
            display:inherit;
            border-right:5px solid #6D64FA;
            p{
                color:var(--primary-color);
            }
            svg{
                color:var(--primary-color);
            }
        }
        svg{
            color:#676464;
        }
    }
`

const WorkerWrapper = ({children}) => {
    return (
      <Grid templateColumns="21rem auto">
        <GridItem>
          <Flex
            flexDir={"column"}
            align="center"
            bgColor="#FBFAFF"
            minHeight={"100vh"}
            pt="10"
            h={"100%"}>
            <StyledLogo>PeepsDB</StyledLogo>
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
        <GridItem px="10">
          <Box position={""}>
            <NavLayout title={"Users"}>{children}</NavLayout>
          </Box>
        </GridItem>
      </Grid>
    );
}

export default WorkerWrapper