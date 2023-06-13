import { MainHeading } from "."
import { useWorkspaceProjects } from "../../hooks/useWorkspace"
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../layouts/Spinner'
import ADOProjectContent from '../ado/ADOProjectContent'
import { Box, Flex, Text } from "@chakra-ui/react"
import useWidget from "../../hooks/useWidget"


const WorkspaceProjects=()=>{

    
    const {icons} = useWidget()

    const titleIcons = icons('25px');

    const {loading,projects} = useWorkspaceProjects();
    
    const  [titleText,setTitleText] = useState('All');

    const [projectState,setProjectState]= useState([]);

    const [search, setSearch] = useState('');

    useEffect(()=>{
        setProjectState(projects)
    },[projects.length]);

    const filterProjects = (type)=>{
        setProjectState(type? projects?.filter(entry=>(entry?.provider ===type)): projects );
        setTitleText(type==='jira'?'Jira':type==='ado'?'ADO':'All');
    };

    // console.log('projects state',projectState);

    return(
        <>
        
            <MainHeading title={
                <Flex gap='0.6em'>
                    {titleIcons[titleText.toLocaleLowerCase()]}
                    <Text> {`${titleText} Projects`} </Text>
                </Flex>
            } toggle={filterProjects} />

            <Box mt="4rem">
                {loading && <Spinner />}

                {projectState?.length && (
                    <Flex align={"center"} gap="2" bg="#fcfcfc" w={["full","30rem"]} 
                     border="1px solid #f7f7f7" 
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

                {projectState?.length && (
                    <ADOProjectContent
                     projects={projectState}
                     search={search}
                    //  workItems={[]}
                    />
                )}
            </Box>

        </>

    )
};





export default WorkspaceProjects;