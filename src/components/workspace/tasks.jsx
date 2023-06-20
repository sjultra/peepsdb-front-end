import { MainHeading } from "."
import { useWorkspaceTasks } from "../../hooks/useWorkspace"
import React, {  useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../layouts/Spinner'
import { Box, Flex, Text } from "@chakra-ui/react"
import {  useMediaQuery } from '@chakra-ui/react';
import JiraIssuesContent from '../jira/JiraIssuesContent2';
import {
    Table,
    Thead,
    Tr,
    Th,
  } from '@chakra-ui/react';

import Select from 'react-select';
import useWidget from "../../hooks/useWidget"


const WorkspaceTasks=()=>{

    const [is500px] = useMediaQuery('(max-width: 500px)');
    const [is600px] = useMediaQuery('(max-width: 600px)');
  
    const tableHeadingStyles = {
      templateColumns: '0.07fr 0.58fr 0.2fr 0.15fr',
      gap: '2rem',
      p: is500px
        ? '1.7rem 1rem 1.7rem 1rem'
        : is600px
        ? 'padding: 1.7rem 1rem 1.7rem 1rem'
        : '2rem 1rem 2rem 3rem',
      mt: '2rem',
      mb: '1rem',
      fontWeight: '500',
      minWidth: '120rem',
      borderBottom: '1px solid #aaa',
    };

    const {icons} = useWidget();

    
    const titleIcons = icons('25px');

    
    const {loading,tasks} = useWorkspaceTasks();
    
    
    const  [titleText,setTitleText] = useState('All');

    
    const [taskstate,setTaskstate]= useState([]);

    
    const [search, setSearch] = useState('');


    useEffect(()=>{
        setTaskstate(tasks)
    },[tasks?.length]);


    const filterTasks = (type)=>{
        console.log('task type',type);
        let filter = tasks?.filter(entry=>(entry?.provider ===type))
        type==='ado' && console.log('ado filters',filter)
        setTaskstate(type?filter : tasks );
        setTitleText(type==='jira'?'Jira':type==='ado'?'ADO':'All');
    };


    const uniqueEmails =  [
        ...new Set(taskstate.map(entry=>entry?.assignee?.emailAddress))
    ]
    

    const assignedUsers =uniqueEmails.map(assigneeEmail=>{
        let foundObject = taskstate?.find(task=>task?.assignee?.emailAddress===assigneeEmail);
        return({
            label:foundObject?.assignee?.displayName || 'Unassigned',
            value:foundObject?.assignee?.emailAddress ||undefined
        })
    })
    

    const onFilterTasksByUser = (e)=>{
        if(!e) {
            setTaskstate(tasks );
            return
        }        
        const {value} = e
        setTaskstate(tasks?.filter(entry=>(entry?.assignee?.emailAddress ===value)) );
    }


    const searchTaskByName = (e)=>{
        const {value} = e?.target;

        let foundMatchingSearch = tasks?.filter(task=>task?.summary?.toLowerCase()?.includes(value));
        console.log('event value',foundMatchingSearch)

        
        setTaskstate(foundMatchingSearch && value?foundMatchingSearch:tasks);
    }


    const memoizeReactSelect = useMemo(()=>
        <Select 
         isClearable
         name={'assigned'}
         styles={{input:(styles)=>({...styles,minWidth:'85px'})}} 
         onChange={onFilterTasksByUser} options={assignedUsers} 
         placeholder={'Assigned to'}
       />
    ,[assignedUsers])




    return(
        <>
        
            <MainHeading  title={
                <Flex gap='0.6em'>
                    {titleIcons[titleText.toLocaleLowerCase()]}
                    <Text> {`${titleText} Tasks`} </Text>
                </Flex>
            }  toggle={filterTasks} />

            <Box mt="4rem">
                {loading && <Spinner />}

                {tasks?.length && (
                    <Flex align={'center'} gap='1.5em'>
                        <Flex align={"center"} gap="2" bg="#fcfcfc" w={["full","30rem"]} 
                         border="1px solid #f7f7f7" borderRadius="100px" 
                         px="1.3rem" py="0.5rem"
                        >
                            <FiSearch color="#6f6f74"/>
                            <input
                                type='text'
                                style={{background:"transparent", outline:"none", width:"100%", padding:"0.5rem"}}
                                placeholder='Search...'
                                // value={search}
                                onChange={searchTaskByName}
                            />
                        </Flex>

                        {memoizeReactSelect}
                        

                    </Flex>
                )}

                {loading && <Spinner />}
                {/* {error && <Message msg={error} variant="error" />} */}

                {taskstate?.length && (
                    <>
                        {/* <Filter issues={issues} /> */}
                        <Box
                         sx={{
                            'overflow-x': 'auto',
                            ' -ms-overflow-style': 'none' /* IE 11 */,
                            'scrollbar-width': 'none' /* Firefox 64 */,

                            '&::-webkit-scrollbar': {
                                width: 0,
                            },
                         }}
                         className="tableContainer"
                        >

                            <Table className="workspaceTable" mt='1.5em' variant='simple'>
                                <Thead>
                                <Tr >
                                    {
                                        ['ID','Title','Assigned to','Last updated','Status'].map((entry,index)=>
                                            <Th fontSize={'13px'} key={index}>{entry}</Th>                            
                                        )
                                    }
                                </Tr>
                                </Thead>
                                <JiraIssuesContent issues={taskstate} />

                            </Table>

        
                        </Box>
                    </>
                )}




            </Box>

        </>

    )
};





export default WorkspaceTasks;