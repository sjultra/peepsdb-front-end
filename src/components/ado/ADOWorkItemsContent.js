import React from 'react';

import { useSelector } from 'react-redux';
import { Box, Image, Heading, useMediaQuery } from '@chakra-ui/react';

import { filteredWorkItems } from '../../actions/adoActions';

const ADOWorkItemsContent = ({ projectWorkItems }) => {
  // Work Items Styles
  const [is600] = useMediaQuery('(maxWidth: 600px');
  const [is500] = useMediaQuery('(maxWidth: 500px');

  const itemStyles = {
    display: 'grid',
    gridTemplateColumns: '0.07fr 0.58fr 0.2fr 0.15fr',
    gridColumnGap: '2rem',
    p: is600
      ? '1.7rem 1rem 1.7rem 3rem'
      : is500
      ? '1.7rem 1rem 1.7rem 1rem'
      : '1.2rem 1rem 1.2rem 3rem',
    borderBottom: '1px solid #f1f1f1',
    minWidth: '120rem',
    fontSize: '1.5rem',
  };

  const assignedToStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const assignedToImgStyles = {
    w: '2rem',
    borderRadius: '50%',
    mr: '0.7rem',
  };

  const stateValueStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    _first: {
      h: '1rem',
      w: '1rem',
      borderRadius: '50%',
      marginRight: '0.6rem',
    },
  };

  // Sets the work item state indicator background
  function setStateIndicator({ state }) {
    const bg =
      state === 'To Do' || state === 'New'
        ? '#b2b2b2'
        : state === 'Active' || state === 'Doing'
        ? '#5e55ef'
        : state === 'Resolved'
        ? '#ff9d00'
        : '#007acc';

    return <Box as="span" style={{ background: bg }} />;
  }

  const stateIndicatorStyles = {
    h: '1rem',
    w: '1rem',
    display: 'inline-block',
    borderRadius: '50%',
    mr: '0.6rem',
  };

  // Redux Selector
  const filters = useSelector((state) => state.adoFilter);

  return (
    <Box>
      {projectWorkItems && (
        <Box>
          {filteredWorkItems(projectWorkItems, filters)
            .sort((a, b) => {
              return a.fields.changedDate < b.fields.changedDate
                ? 1
                : a.fields.changedDate > b.fields.changedDate
                ? -1
                : 0;
            })
            .map((item, index) => {
              const { fields } = item;
              return (
                <Box {...itemStyles} key={index}>
                  <Box>{fields.id}</Box>
                  <Box>{fields.title}</Box>
                  <Box {...assignedToStyles}>
                    {/* Profile picture */}
                    <Image
                      {...assignedToImgStyles}
                      src={
                        fields.assignedTo.imageUrl
                          ? fields.assignedTo.imageUrl
                          : 'https://cdn.vsassets.io/ext/ms.vss-work-web/wit-ui-identity/Content/notassigned-user.T_2eoRxWQUV1XYFn.svg'
                      }
                      alt=""
                    />
                    <Box>
                      {fields.assignedTo.displayName
                        ? fields.assignedTo.displayName
                        : 'Unassigned'}
                    </Box>
                  </Box>
                  <Box {...stateValueStyles}>
                    <Box
                      as="span"
                      {...stateIndicatorStyles}
                      bg={
                        setStateIndicator(fields.state).props.style.background
                      }
                    />

                    <Box as="span">{fields.state}</Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}

      {!projectWorkItems.length && <Heading size="md">No work Items</Heading>}
    </Box>
  );
};

export default ADOWorkItemsContent;
