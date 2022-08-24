import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DetailsWrapper } from '../form/FormResources';
import { Flex, Text } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';

const PrimaryHeading = styled.h1`
  margin: 2rem 0;
`;

const Details = styled.div`
  @media (max-width: 800px) {
    overflow-x: auto;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  align-items: center;

  @media (max-width: 800px) {
    width: 76rem;
  }

  div {
    height: 7rem;
    padding: 1rem 2rem;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
  }

  div:first-child {
    background: rgba(100, 90, 240, 0.173);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  div:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: rgba(160, 154, 238, 0.173);
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

export const Button = styled.div`
  display: inline-block;
  padding: 1rem 3rem;
  background: #5e55ef;
  border: 1px solid #5e55ef;
  color: #fff;
  text-align: center;
  border-radius: 0.5rem;
  width: 20rem;
  transition: all 0.3s;

  &:hover {
    background: #5e55ef;
    opacity: 0.9;
  }
`;

const ProfileInfo = ({ profile }) => {
  const {
    firstName:firstname,
    lastName:lastname,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = profile || {};



  return (
    <DetailsWrapper>
      <PrimaryHeading className='text-center '>
        <span className='text-primary'>User</span> Profile
      </PrimaryHeading>
      <Details>
        <Flex justify={'flex-end'}>
          <Link to='/edit-profile'>
              <Flex p='0.4em 1em' borderRadius={'6px'} color={'white'} gap='0.5em' bg='var(--primary-color)' my='0.8em' align={'center'}>
                <Text fontSize={'19px'}> Edit Profile</Text>
                <FiEdit fontSize={'22px'} />
              </Flex>
          </Link>

        </Flex>

        <Items>
          <div>Firstname</div>
          <div>{firstname ? firstname : ''}</div>
        </Items>
        <Items>
          <div>Lastname</div>
          <div>{lastname ? lastname : ''}</div>
        </Items>
        <Items>
          <div>Alias</div>
          <div>{alias ? alias : ''}</div>
        </Items>
        <Items>
          <div>SkypeId</div>
          <div>{skypeId ? skypeId : ''}</div>
        </Items>
        <Items>
          <div>Google Gmail Id</div>
          <div>{googleGmailId ? googleGmailId : ''}</div>
        </Items>
        <Items>
          <div>Apple Email Id</div>
          <div>{appleEmailId ? appleEmailId : ''}</div>
        </Items>
        <Items>
          <div>Phone</div>
          <div>{phone ? phone : ''}</div>
        </Items>
        <Items>
          <div>Time Zone Url</div>
          <div>{timeZoneUrl ? timeZoneUrl : ''}</div>
        </Items>
        <Items>
          <div>Days Per Week</div>
          <div>{daysPerWeek ? daysPerWeek : ''}</div>
        </Items>
        <Items>
          <div>Hours Per Day</div>
          <div>{hoursPerDay ? hoursPerDay : ''}</div>
        </Items>
        <Items>
          <div>Local Currency Url</div>
          <div>{localCurrencyUrl ? localCurrencyUrl : ''}</div>
        </Items>
        <Items>
          <div>FEM Slack Profile Url</div>
          <div>{femSlackProfileUrl ? femSlackProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Start Date</div>
          <div>{startDate ? startDate : ''}</div>
        </Items>
        <Items>
          <div>Payment Profile Url</div>
          <div>{paymentProfileUrl ? paymentProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Twitter Profile Url</div>
          <div>{twitterProfileUrl ? twitterProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Facebook Profile Url</div>
          <div>{facebookProfileUrl ? facebookProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Github Profile Url</div>
          <div>{githubProfileUrl ? githubProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Linkedin Profile Url</div>
          <div>{linkedinProfileUrl ? linkedinProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Calendly Profile Url</div>
          <div>{calendlyProfileUrl ? calendlyProfileUrl : ''}</div>
        </Items>
      </Details>
    </DetailsWrapper>
  );
};

export default ProfileInfo;
