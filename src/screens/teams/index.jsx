import UsersScreen from "./UsersScreen"
import AdminAsideBar from "../../components/layouts/AdminAsideBar"
import useAuthActions from "../../hooks/useAuth"
import WorkerAsideBar from "../../components/layouts/WorkerAsideBar"
import Spinner from "../../components/layouts/Spinner"
import { Flex } from "@chakra-ui/react"
import MongoChart from "./mongochart"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import useTeams from "../../hooks/useTeams"
import { useEffect, useRef } from "react";
import { IoColorFillSharp } from "react-icons/io5"


const Teams = () => {
  // Selectors
  const { auth, loading, profile } = useAuthActions();

  const { profiles, fetchAllProfiles } = useTeams();
  const fetchProfilesRef = useRef(fetchAllProfiles);

  useEffect(() => {
    if (!profiles?.length) {
      fetchProfilesRef.current();
    }
  }, [profiles]);


  // spinner
  if (loading || !profile) {
    return (
      <Flex
        position={'fixed'}
        w="100vw"
        h="100vh"
        align={'center'}
        justify="center"
        top={0}
        left={0}
      >
        <Spinner />
      </Flex>
    );
  }

  const activeTabState = {
    color:'#039EF4',
    fontWeight:600,
    background:'none'
  }

  // return teams members with custom admin aside bar
  if (auth?.token && auth?.role === 'Admin') {
    return (
      <AdminAsideBar>

      <Tabs mt='1em'>
        <TabList gap='0.5em' maxW={'300px'}
         border='1px solid #F5F5F5'
         justifyContent={'space-between'}
         
        >
          {
            ['List view','Map View'].map((entry,index)=>(
                <Tab 
                  // background={'var(--primary-color)'}
                  // flex={1}
                  py='1.3em'
                  key={index}
                  _selected={{...activeTabState,borderBottom:'2px solid #039EF4',
                }}
                  _hover={activeTabState}
                  flex='0.7'
                  fontSize={'13px'}
                  borderRadius={'2px'} 
                  color='#B4AFAF'
                >
                  {entry}
                </Tab>
              
              ))
          }
        </TabList>

        <TabPanels>

          <TabPanel>
            <UsersScreen profiles={profiles} />
          </TabPanel>

          <TabPanel>
            <MongoChart  profiles ={profiles}/>
          </TabPanel>

        </TabPanels>
      </Tabs>
      </AdminAsideBar>
    );
  }

  // return teams members with custom worker aside bar
  return (
    <WorkerAsideBar>
      <UsersScreen  profiles={profiles}/>
    </WorkerAsideBar>
  );
};


const Chart = ()=>{
  return(
    <>
    
    </>
  )
}

export default Teams
