import { MainHeading } from "."
import { useWorkspaceTasks } from "../../hooks/useWorkspace"
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../layouts/Spinner'
import { Box, Flex } from "@chakra-ui/react"
import { useSelector, useDispatch } from 'react-redux';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';

import { toggleJira } from '../../actions/toggleActions';
import { getLabelIssues } from '../../actions/jiraActions';

import JiraIssuesContent from '../jira/JiraIssuesContent';
import Filter from '../jira/Filter';
import Message from '../layouts/Message';
import useGoBack from '../../hooks/useGoBack';
import NavLayout from '../layouts/NavLayout';

const JiraIssuesScreen = ({ match }) => {
  // Styles
  const goback = useGoBack({ title: `${match.params.id}` });

  const dispatch = useDispatch();

  // Selectors
  const issues = useSelector((state) => state.labelIssues.issues);
  const error = useSelector((state) => state.labelIssues.error);
  const loading = useSelector((state) => state.labelIssues.loading);



  return (
    <Box px={['5px', '40px', '40px']}>
    </Box>
  );
};



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
  
  

    const {loading,tasks} = useWorkspaceTasks();
    
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



    const issues = tasks

    console.log('tasks state',issues[0]);


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

                {loading && <Spinner />}
                {/* {error && <Message msg={error} variant="error" />} */}

                {issues?.length && (
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
                    >
                    <Grid {...tableHeadingStyles}>
                        <GridItem>ID</GridItem>
                        <GridItem>Title</GridItem>
                        <GridItem>Assigned To</GridItem>
                        <GridItem>Status</GridItem>
                    </Grid>
                    <JiraIssuesContent issues={issues} />
                    </Box>
                </>
                )}




            </Box>

        </>

    )
};





export default WorkspaceTasks;