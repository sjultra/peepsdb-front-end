import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import MainHeading from '../components/layouts/MainHeading';
import { toggleAdo } from '../actions/toggleActions';
import {
  getAllWorkItemsId,
  getAllWorkItemsDetails,
  getProjectWorkItems,
  setAdoTextFilter,
  setAdoAssignedToFilter,
  setAdoStateFilter,
} from '../actions/adoActions';
import Filter from '../components/ado/Filter';
import Spinner from '../components/layouts/Spinner';
import ADOWorkItemsContent from '../components/ado/ADOWorkItemsContent';
import { Box } from "@chakra-ui/react"
import useGoBack from "../hooks/useGoBack";
import NavLayout from '../components/layouts/NavLayout';

const ContentWrapper = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const TableHeading = styled.div`
  display: grid;
  grid-template-columns: 0.07fr 0.58fr 0.2fr 0.15fr;
  grid-column-gap: 2rem;
  padding: 2rem 1rem 2rem 3rem;
  margin-top: 2rem;
  font-weight: 500;
  min-width: 120rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #aaa;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const ADOWorkItemsScreen = ({ match }) => {
  const goback = useGoBack({title:`${match.params.id}`});
  const dispatch = useDispatch();

  // Selectors
  const workItems = useSelector(
    (state) => state.allWorkItemsDetails.workItemsDetails
  );
  const workItemsId = useSelector((state) => state.allWorkItemsId.workItemsId);
  const loading = useSelector((state) => state.projectWorkItems.loading);
  const projectWorkItems = useSelector(
    (state) => state.projectWorkItems.projectWorkItems
  );

  useEffect(() => {
    dispatch(setAdoTextFilter(''));
    dispatch(setAdoAssignedToFilter(''));
    dispatch(setAdoStateFilter(''));
  }, [dispatch]);

  // Switch to ADO Projects
  useEffect(() => {
    dispatch(toggleAdo());
  }, [dispatch]);

  // Get all workitems details
  useEffect(() => {
    if (!workItemsId) {
      dispatch(getAllWorkItemsId());
    } else {
      if (!workItems) {
        let ids;

        ids = workItemsId.map((item) => item.id);
        dispatch(getAllWorkItemsDetails(ids));
      }
    }
  }, [dispatch, workItemsId, workItems]);

  // Get workitems specific to selected project
  useEffect(() => {
    let adoProjectWorkItems;
    if (workItems && workItems.length !== 0) {
      adoProjectWorkItems = workItems.filter((item) => {
        return item.fields.teamProject === match.params.id;
      });
      dispatch(getProjectWorkItems(adoProjectWorkItems));
    }
  }, [workItems, match.params.id, dispatch]);



  return (
    <Box px={["5px", "40px", "40px"]}>
   <NavLayout displayAsidebar={false}>

      {goback}

      {loading && <Spinner />}

      {projectWorkItems && (
        <>
          <Filter projectWorkItems={projectWorkItems} />
          <ContentWrapper>
            <TableHeading>
              <div>ID</div>
              <div>Title</div>
              <div>Assigned To</div>
              <div>State</div>
            </TableHeading>

            <ADOWorkItemsContent projectWorkItems={projectWorkItems} />
          </ContentWrapper>
        </>
      )}
    </NavLayout>
    </Box>
  );
};

export default ADOWorkItemsScreen;
