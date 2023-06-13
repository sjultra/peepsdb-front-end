import React, { useEffect } from 'react';
import { Grid, GridItem, Box, useMediaQuery } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
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
import useGoBack from '../hooks/useGoBack';
import NavLayout from '../components/layouts/NavLayout';

const ADOWorkItemsScreen = ({ match }) => {
  // Styles
  const [is500px] = useMediaQuery('(max-width: 500px)');
  const [is600px] = useMediaQuery('(max-width: 600px)');

  const tableHeadingStyles = {
    p: is500px
      ? '1.7rem 1rem 1.7rem 1rem'
      : is600px
      ? '1.7rem 1rem 1.7rem 3rem'
      : '2rem 1rem 2rem 3rem',
    mt: '2rem',
    mb: '1rem',
    fontWeight: '500',
    minWidth: '120rem',
    borderBottom: '1px solid #aaa',
  };

  const goback = useGoBack({ title: `${match.params.id}` });
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
        return item?.teamProject === match.params.id;
      });
      dispatch(getProjectWorkItems(adoProjectWorkItems));
    }
  }, [workItems, match.params.id, dispatch]);

  return (
    <Box px={['5px', '40px', '40px']}>
      <NavLayout displayAsidebar={false}>
        {goback}

        {loading && <Spinner />}

        {projectWorkItems && (
          <>
            <Filter projectWorkItems={projectWorkItems} />
            <Box
              sx={{
                'overflow-x': 'auto',
                '-ms-overflow-style': 'none' /* IE 11 */,
                'scrollbar-width': 'none' /* Firefox 64 */,

                ' &::-webkit-scrollbar': {
                  width: 0,
                },
              }}
            >
              <Grid
                templateColumns="0.07fr 0.58fr 0.2fr 0.15fr"
                gap="2rem"
                {...tableHeadingStyles}
              >
                <GridItem>ID</GridItem>
                <GridItem>Title</GridItem>
                <GridItem>Assigned To</GridItem>
                <GridItem>Status</GridItem>
              </Grid>

              <ADOWorkItemsContent projectWorkItems={projectWorkItems} />
            </Box>
          </>
        )}
      </NavLayout>
    </Box>
  );
};

export default ADOWorkItemsScreen;
