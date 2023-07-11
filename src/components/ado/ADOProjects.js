import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import {
  getAdoProjects,
  getAllWorkItemsId,
  getAllWorkItemsDetails,
} from '../../actions/adoActions'
import Spinner from '../layouts/Spinner'
import Message from '../layouts/Message'
import ADOProjectContent from './ADOProjectContent'
import { Box, Flex } from "@chakra-ui/react"

const ADOProjects = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  // Selectors
  const projects = useSelector((state) => state.adoProjects?.projects)
  const loading = useSelector((state) => state.adoProjects?.loading)
  const error = useSelector((state) => state.adoProjects?.error)
  const workItems = useSelector(
    (state) => state.allWorkItemsDetails?.workItemsDetails
  )
  const workItemsId = useSelector((state) => state.allWorkItemsId?.workItemsId)
  const allWorkItemsDetails = useSelector(
    (state) => state.allWorkItemsDetails?.workItemsDetails
  )


  // Get all ADO Projects
  useEffect(() => {
    if (!projects) {
      dispatch(getAdoProjects())
    }
  }, [projects, dispatch])

  // Get all workitems id
  useEffect(() => {
    if (!workItemsId) {
      dispatch(getAllWorkItemsId())
    }
  }, [workItemsId, dispatch])

  // Get all workitems details
  useEffect(() => {
    if (!allWorkItemsDetails) {
      let ids
      if (workItemsId) {
        ids = workItemsId.map((item) => item.id)
        dispatch(getAllWorkItemsDetails(ids))
      }
    }
  }, [allWorkItemsDetails, dispatch, workItemsId])

  return (
    <Box mt="4rem">
      {loading && <Spinner />}
      {error && <Message msg={error.msg} variant='error' />}

      {projects && (
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

      {projects && (
        <ADOProjectContent
          projects={projects}
          search={search}
          workItems={workItems}
        />
      )}
    </Box>
  )
}

export default ADOProjects
