import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  display: grid;
  grid-template-columns: 0.22fr 0.4fr 0.38fr;
  grid-column-gap: 3rem;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border-bottom: 1px solid #f1f1f1;
  min-width: 120rem;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;


const MeetingScheduleContent = ({ profiles, filterText }) => {
  

  const filterMeeting = (item) => {
    return (
      item?.firstName?.toLowerCase()?.includes(filterText.toLowerCase()) ||
      item?.lastName?.toLowerCase()?.includes(filterText.toLowerCase())
    );
  };


  console.log('meeting profiles',profiles);

  return (
    <div>
      {profiles &&
        profiles
          .filter((item) => item.role !== 'Guest')
          .filter(filterMeeting)
          .map((profile, index) => {
            const { firstName:firstname, lastName:lastname, timeZoneUrl, calendlyProfileUrl } =
              profile;
            return (
              <Item key={index}>
                <div>
                  {firstname[0].toUpperCase() + firstname.slice(1)}{' '}
                  {lastname[0].toUpperCase() + lastname.slice(1)}
                </div>
                {timeZoneUrl ? (
                  <a
                    href={timeZoneUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-primary'
                  >
                    {timeZoneUrl}
                  </a>
                ) : (
                  <div>nil</div>
                )}

                {calendlyProfileUrl ? (
                  <a
                    href={calendlyProfileUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-primary'
                  >
                    {calendlyProfileUrl}
                  </a>
                ) : (
                  <div>nil</div>
                )}
              </Item>
            );
          })}
      {profiles === [] && <h3>No user</h3>}
    </div>
  );
};

export default MeetingScheduleContent;
