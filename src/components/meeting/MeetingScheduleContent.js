import React from 'react';
import { Box, Grid, useMediaQuery } from '@chakra-ui/react';

const MeetingScheduleContent = ({ profiles, filterText }) => {
  // Styling
  const [is600px] = useMediaQuery('(max-width: 600px)');
  const [is500px] = useMediaQuery('(max-width: 500px)');

  const itemStyling = {
    p: is500px
      ? '1.7rem 1rem 1.7rem 1rem'
      : is600px
      ? '1.7rem 1rem 1.7rem 3rem'
      : '1.2rem 1rem 1.2rem 3rem',
    borderBottom: '1px solid #f1f1f1',
    minWidth: '120rem',
    fontSize: '1.5rem',
  };

  const filterMeeting = (item) => {
    return (
      item?.firstName?.toLowerCase()?.includes(filterText.toLowerCase()) ||
      item?.lastName?.toLowerCase()?.includes(filterText.toLowerCase())
    );
  };

  console.log('meeting profiles', profiles);

  return (
    <Box>
      {profiles &&
        profiles
          .filter((item) => item.role !== 'Guest')
          .filter(filterMeeting)
          .map((profile, index) => {
            const {
              firstName: firstname,
              lastName: lastname,
              timeZoneUrl,
              calendlyProfileUrl,
            } = profile;
            return (
              <Grid
                gridTemplateColumns="0.22fr 0.4fr 0.38fr"
                gridColumnGap="3rem"
                {...itemStyling}
                key={index}
              >
                <div>
                  {firstname[0].toUpperCase() + firstname.slice(1)}{' '}
                  {lastname[0].toUpperCase() + lastname.slice(1)}
                </div>
                {timeZoneUrl ? (
                  <a
                    href={timeZoneUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary"
                  >
                    {timeZoneUrl}
                  </a>
                ) : (
                  <div>nil</div>
                )}

                {calendlyProfileUrl ? (
                  <a
                    href={calendlyProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary"
                  >
                    {calendlyProfileUrl}
                  </a>
                ) : (
                  <div>nil</div>
                )}
              </Grid>
            );
          })}
      {profiles === [] && <h3>No user</h3>}
    </Box>
  );
};

export default MeetingScheduleContent;
