import { MainHeading } from "."
import { useWorkspaceTasks } from "../../hooks/useWorkspace"
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../layouts/Spinner'
import ADOProjectContent from '../ado/ADOProjectContent'
import { Box, Flex } from "@chakra-ui/react"


const WorkspaceTasks=({activeTabName})=>{

    const {loading,tasks} = useWorkspaceTasks(activeTabName);
    
    const  [titleText,setTitleText] = useState('All');

    const [taskstate,setTaskstate]= useState([]);

    const [search, setSearch] = useState('');

    // useEffect(()=>{
    //     setTaskstate(tasks)
    // },[tasks.length]);

    const filterTasks = (type)=>{
        console.log('task type',type);
        setTaskstate(type? tasks?.filter(entry=>(entry?.provider ===type)): tasks );
        setTitleText(type==='jira'?'Jira':type==='ado'?'ADO':'All');
    };

    console.log('tasks state',taskstate);

    return(
        <>
        
            <MainHeading title={`${titleText} tasks`} toggle={filterTasks} />

            <Box mt="4rem">
                {loading && <Spinner />}

                {taskstate?.length && (
                    <Flex align={"center"} gap="2" bg="#fcfcfc" w={["full","30rem"]} border="1px solid #f7f7f7" 
                    borderRadius="100px" px="1.3rem" py="0.5rem">
                    <FiSearch color="#6f6f74"/>
                    <input
                        type='text'
                        style={{background:"transparent", outline:"none", width:"100%", padding:"0.5rem"}}
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    </Flex>
                )}

                {/* {taskstate?.length && (
                    <ADOProjectContent
                     tasks={taskstate}
                     search={search}
                    //  workItems={[]}
                    />
                )} */}
            </Box>

        </>

    )
};





export default WorkspaceTasks;