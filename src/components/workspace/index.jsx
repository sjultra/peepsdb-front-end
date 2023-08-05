import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from "react"
import { Stack,Select } from "@chakra-ui/react"
import WorkspaceProjects from "./projects"
import WorkspaceTasks from "./tasks"

export const MainHeading = ({ title, toggle }) => {
  
  // Selectors
  const filterDisplayType = (e)=>{
    toggle(e?.target?.value);
  }

  
  return (
    <Stack direction="row" alignItems="center" justify={"space-between"} mt="6">
      
      <h1 className="text-primary">
        {title}
      </h1>

      {
          /* 
          <Flex
            w="fit-content"
            align="center"
            justify="center"
            borderRadius="full"
            overflow={"hidden"}
          >
            <CustomTab
              borderLeftRadius="full"
              tabName={"ado"}
              toggle={toggle}
              value="ADO"
              title={title}
              initialTitle="ADO Projects"
            />
            <CustomTab
              borderRightRadius="full"
              tabName={"jira"}
              toggle={toggle}
              value="JIRA"
              title={title}
              initialTitle="Jira Labels"
            />
          </Flex> 
          */
      }

      <Select onChange={filterDisplayType} maxW='60px' placeholder='All'>
        <option value={'jira'}>JIRA</option>
        <option value='ado'>ADO</option>
      </Select>

    </Stack>
  )
}

const UserWorkspace = () => {

  const activeTabState = {
    color:'#039EF4',
    fontWeight:600,
    background:'none'
  }

  return (
    <>

      <Tabs>
        <TabList
         mt='2em'
         gap='0.5em' maxW={'330px'}
         border='1px solid #F5F5F5'
         justifyContent={'space-between'}
        >
          {

            ['Projects','Tasks'].map((entry,index)=>(
              <Tab 
                py='1em'
                key={index}
                _selected={{
                  ...activeTabState,
                  borderBottom:'2px solid #039EF4',
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
            <WorkspaceProjects/>
          </TabPanel>
          <TabPanel>
            <WorkspaceTasks/>
          </TabPanel>
         </TabPanels>
      </Tabs>

    </>
  )

}

export default UserWorkspace
