import { Box, Flex, Text, Input as InputElement } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import useValidate from '../../../hooks/useValidate';
import { renderJSX } from '../../../utils/helpers';
import Btn from '../../../widgets/Button';
import Input from '../../../widgets/Input';
// import TextInput from "../../../widgets/Text";
// import { backendURL } from "../../../utils/setEnv";
import SelectInput from '../../../widgets/Select';
import { allTimeZones } from '../../../utils/timezone-list';
import { RETURN_EMAIL_HIERARCHY } from '../../../utils/setEnv';
// import { useGoogleLogin } from '@react-oauth/google';
// import useWidget from "../../../hooks/useWidget";

const FormWorkDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
  preview,
  openConnections,
  setFormData,
}) => {
  const [workEmails, setWorkEmails] = useState([]);

  const setWorkEmailValue = (e, suffix) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: `${e.target.value}@${suffix}`,
    }));

  const {
    timezone,
    daysPerWeek,
    hoursPerDay,
    startDate,
    googleGmailId,
    title,
  } = formData;

  const val3idateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const { validateConditions } = useValidate();

  const proceed = (e) => {
    e.preventDefault();

    let error = false;

    if (
      validateConditions(
        [hoursPerDay, val3idateEmail(googleGmailId)],
        ['Hours per day must be at least 1', 'Please enter a valid google mail']
      )
    ) {
      error = true;
    } else {
      console.log('payload at step2', formData);

      nextStep();
    }
  };

  const previous = (e) => {
    e.preventDefault();

    prevStep();
  };

  const workEmailKeys = Object.keys(RETURN_EMAIL_HIERARCHY().values);
  const workEmailValues = Object.values(RETURN_EMAIL_HIERARCHY().values);

  useEffect(() => {
    let workemails = workEmails;

    workEmailValues.map((value, index) => {
      let fieldName = workEmailKeys[index];

      let defaultEmail = `${formData['alias']}@${value}`;

      workemails[index] = {
        fieldName,
        value: formData[fieldName] || defaultEmail,
        emailSuffix: value,
      };
    });

    console.log(
      'initial work email keys and values',
      workEmailKeys,
      workEmailValues,
      workEmails
    );

    setWorkEmails([...workemails]);
  }, []);

  console.log('work emails in useState', workEmails);

  const memoizeWorkEmails = useMemo(() => {
    console.log('work emails in memo', workEmails);

    return workEmails.map((emailObj, index) => {
      const { fieldName, value, emailSuffix } = emailObj;

      const valueEntry = value?.includes(emailSuffix)
        ? value.split(`@${emailSuffix}`)[0]
        : value;

      return (
        <Box flex={1} key={index} gap="1em">
          <Text as="label" fontSize={'15px'} p="1rem 0">
            {!index
              ? `Primary work email`
              : `Secondary work email${
                  workEmails?.length > 2 ? index + 1 : ''
                }`}
          </Text>
          <Flex mt="1rem" gap="1em" align={'center'}>
            <InputElement
              bg="#E8E8E8"
              h="50px"
              borderRadius={'10px'}
              type="text"
              name={fieldName}
              defaultValue={valueEntry}
              onChange={(e) => setWorkEmailValue(e, emailSuffix)}
              flex={{ base: '0.85' }}
              //  defaultValue={}

              {...{ preview }}
            />

            <Text fontSize="16px">@{emailSuffix}</Text>
          </Flex>

          <Text mt="0.2em"></Text>
        </Box>
      );
    });
  }, [workEmails]);

  return (
    <>
      <Flex my="0.2em" align={'center'} justify={'flex-end'}>
        {/* {
          renderJSX(
            preview,
            <TextInput variant={'s2'}>Work</TextInput>
          )
        }
        */}

        {renderJSX(
          !preview,
          <Btn px="1em" onClick={openConnections}>
            My Connections
          </Btn>
        )}
      </Flex>

      <Flex mt="1em" direction={{ base: 'column', lg: 'row' }} gap={'2em'}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => onChange(e)}
          flex={1}
          {...{ preview }}
        />

        <Box flex={1}>
          <SelectInput
            onChange={(e) => {
              onChange(e);
              return e?.target?.value;
            }}
            options={allTimeZones(true)}
            label={'Timezone'}
            name="timezone"
            defaultValue={timezone}
          />
        </Box>
      </Flex>

      <Flex mt="1em" direction={{ base: 'column', lg: 'row' }} gap={'2em'}>
        {memoizeWorkEmails}
      </Flex>

      <Flex mt="1em" direction={{ base: 'column', lg: 'row' }} gap={'2em'}>
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => onChange(e)}
          flex={1}
          // required
        />

        <Input
          label="Days Per Week"
          type="number"
          name="daysPerWeek"
          value={daysPerWeek}
          onChange={(e) => onChange(e, 'number')}
          flex={1}
          {...{ preview }}
          // required
        />
      </Flex>

      <Flex mt="1em" direction={{ base: 'column', lg: 'row' }} gap={'2em'}>
        <Input
          label="Hours Per Day"
          type="number"
          name="hoursPerDay"
          value={hoursPerDay}
          onChange={(e) => onChange(e, 'number')}
          flex={{ base: 1, lg: 0.5 }}
          // flex={1}
          {...{ preview }}
          // required
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
    </>
  );
};

export default FormWorkDetails;
