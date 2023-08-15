import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

// import { AiFillEdit } from 'react-icons/ai';
import { renderJSX } from '../../../utils/helpers';

import Btn from '../../../widgets/Button';
import Input from '../../../widgets/Input';
import TextInput from '../../../widgets/Text';
import useWidget from '../../../hooks/useWidget';

const FormSocialDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  // loading,
  profile,
  preview,
  windowRef,
  connections,
  openConnections,
}) => {
  const {
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    skypeId,
    linkedinProfileUrl,
    calendlyProfileUrl,
    provider,
  } = formData;

  const proceed = (e) => {
    console.log('form at step3', formData);
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const { openSocialConnectPopup } = useWidget();

  return (
    <Box>
      <Flex my="0.2em" align={'center'} justify={'flex-end'}>
        {/* {
          renderJSX(
            preview,
            <TextInput variant={'s2'}>Personal</TextInput>
          )
        } */}

        {renderJSX(
          <Btn px="1em" onClick={openConnections}>
            My Connections
          </Btn>
        )}
      </Flex>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={'2em'}
        justify={{ lg: 'space-between' }}
      >
        <Input
          label="Twitter Profile Url"
          value={twitterProfileUrl}
          name="twitterProfileUrl"
          onChange={onChange}
          flex={1}
          {...{ preview }}
        />

        <Input
          label="Facebook Profile Url"
          value={facebookProfileUrl}
          name="facebookProfileUrl"
          onChange={onChange}
          flex={1}
          {...{ preview }}
          Sync={() => {
            connections?.facebookConnect('-inapp');
          }}
          tooltipText="linkedin"
          isNotProvider={provider !== 'linkedin'}
        />
      </Flex>

      <Flex
        mt="1em"
        direction={{ base: 'column', lg: 'row' }}
        gap={'2em'}
        justify={{ lg: 'space-between' }}
      >
        <Input
          label="Skype ID"
          type="text"
          name="skypeId"
          value={skypeId}
          onChange={(e) => onChange(e)}
          flex={1}
          {...{ preview }}
        />

        <Input
          label="Linkedin Profile Url"
          value={linkedinProfileUrl}
          name="linkedinProfileUrl"
          onChange={onChange}
          flex={1}
          Sync={() => {
            connections?.linkedinConnect('-inapp');
          }}
          tooltipText="linkedin"
          isNotProvider={provider !== 'linkedin'}
          {...{ preview }}
        />
      </Flex>

      <Flex
        mt="1em"
        direction={{ base: 'column', lg: 'row' }}
        gap={'2em'}
        justify={{ lg: 'space-between' }}
      >
        <Input
          Sync={() => {
            connections?.githubConnect('-inapp');
          }}
          tooltipText="github"
          isNotProvider={provider !== 'github'}
          label="Github Profile Url"
          value={githubProfileUrl}
          name="githubProfileUrl"
          onChange={onChange}
          flex={1}
          {...{ preview }}
        />

        <Input
          label="Calendly Profile Url"
          value={calendlyProfileUrl}
          name="calendlyProfileUrl"
          onChange={onChange}
          flex={1}
          {...{ preview }}
        />
      </Flex>

      {renderJSX(
        !preview,
        <Flex gap="2em" mt="2em">
          <Btn onClick={(e) => proceed(e)}>Next</Btn>
          <Btn variant={'fade'}>Back</Btn>
        </Flex>,
        <></>
      )}
    </Box>
  );
};

export default FormSocialDetails;
