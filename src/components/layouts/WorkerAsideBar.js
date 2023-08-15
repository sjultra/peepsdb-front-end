import React from 'react';
import { MdSpaceDashboard, MdWorkspaces, MdClose } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import {
  Flex,
  HStack,
  Box,
  Link,
  Text,
  Grid,
  GridItem,
  Show,
} from '@chakra-ui/react';
import NavLayout from './NavLayout';
import { useMenu } from '../../hooks/MenuProvider';

import { NavLink, useLocation } from 'react-router-dom';

const navContainerStyles = {
  p: '0.5em 0.8em',
  minWidth: '155px',
  display: 'inherit',
  borderRight: '5px solid transparent',
  _hover: {
    background: '#fff',
    display: 'inherit',
    borderRight: '5px solid #6d64fa',
    p: {
      color: 'primary.500',
    },
    svg: {
      fill: 'primary.500',
    },
  },
};

const WorkerAsideBar = ({ children }) => {
  // control displaying menu
  const drawer = useMenu();

  return (
    <>
      <Box
        w={{ base: 'full', lg: '0' }}
        h={{ base: 'full', lg: '0' }}
        bg="black"
        p="0px"
        top="0px"
        left="0px"
        bottom="0px"
        right="0px"
        opacity={'0.3'}
        style={{ zIndex: '998' }}
        position={'fixed'}
        display={`${drawer.isopen ? 'auto' : 'none'}`}
        onClick={() => drawer.setMenuStatus((_prev) => !_prev)}
      ></Box>
      <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '21rem auto' }}>
        {/** Side bar menu */}
        <GridItem
          style={{ zIndex: '999', transition: 'right 0.5s linear 0s' }}
          right={{
            base: `${drawer.isopen ? '0%' : '-100%'}`,
            md: '',
            lg: '0%',
          }}
          top="0px"
          position={{ base: 'fixed', md: 'fixed', lg: 'sticky' }}
          w={{ base: '27rem', md: '24rem', lg: 'auto' }}
        >
          <Flex
            as="div"
            flexDir={'column'}
            bgColor="#fcfcfc"
            boxShadow="xs"
            minHeight={'100vh'}
            pt="10"
            px="10"
            h={'100%'}
          >
            {/** logo and close icon */}
            <HStack alignItems="center" justify="space-between">
              <Text
                cursor="pointer"
                fontFamily="logo"
                fontSize="28px"
                fontWeight="700"
              >
                PeepsDB
              </Text>
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
            <Flex flexDir={'column'} align="start" gap="10" mt={'12'}>
              <CustomRouteLink
                title={'Dashboard'}
                icon={<MdSpaceDashboard />}
                route={'/'}
              />
              <CustomRouteLink
                title={'Workspaces'}
                icon={<MdWorkspaces />}
                route={'/worker/workspaces?activity=all'}
              />
              <CustomRouteLink
                title={'Teams'}
                icon={<BsFillPeopleFill />}
                route={'/teams'}
              />
            </Flex>
          </Flex>
        </GridItem>
        {/** past body contents to navbar */}
        <GridItem px={['0', '4', '10']}>
          <Box w="full">
            <NavLayout title={'Users'}>{children}</NavLayout>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

// custom route link
const CustomRouteLink = ({ route, gap, title, icon }) => {
  // control displaying menu
  const drawer = useMenu();

  // gets route and changes link styling if it matches route
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <>
      <Link
        {...navContainerStyles}
        exact
        background={isActive ? '#fff' : ''}
        borderRight={isActive ? '5px solid #6d64fa' : '5px solid transparent'}
        as={NavLink}
        to={`${route}`}
        isActive={() => window.location.pathname === route}
        onClick={() => drawer.setMenuStatus((_prev) => !_prev)}
      >
        <Flex
          color={isActive ? 'primary.500' : '#676464'}
          gap={'5px'}
          align="center"
          cursor={'pointer'}
        >
          {icon}
          <Text fontSize={'14px'} fontWeight="600">
            {title}
          </Text>
        </Flex>
      </Link>
    </>
  );
};

export default WorkerAsideBar;
