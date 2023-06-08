import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import Paginate from '../../widgets/Paginate';
import { Grid, GridItem, Text } from '@chakra-ui/react';

const JiraLabelContent = ({
  labels: labelsArr,
  search,
  loading,
}) => {
  if (!loading && labelsArr) {
    return (
      <Paginate
        payload={labelsArr}
        range={6}
        render={(labels) => (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            mt="8"
            gap="8"
          >
            {labels
              ?.filter((label) =>
                label.toLowerCase().includes(search.toLowerCase())
              )
              .map((label, index) => {
                return <CustomCard label={label} index={index} />;
              })}
          </Grid>
        )}
      />
    );
  } else {
    return <Spinner />;
  }
};

// custom card
const CustomCard = ({ label, index }) => {
  return (
    <GridItem
      key={index}
      py="6"
      px="8"
      bg="#fcfcfc"
      border="1px solid #f7f7f7"
      _hover={{
        boxShadow: 'sm',
      }}
      borderRadius="10px"
      gap="2"
    >
      <Link to={`/jira_issues/${label}`}>
        <Text fontSize="2rem" fontWeight="semibold">
          {label}
        </Text>
      </Link>
    </GridItem>
  );
};

export default JiraLabelContent;
