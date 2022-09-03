import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FormControl, BtnWrapper, BtnPrev, BtnNext } from "./FormResources";
import Input from "../../widgets/Input";
import Btn from "../../widgets/Button";
const FormWorkDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
}) => {
  const {
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    googleGmailId,
    appleEmailId,
    skypeId,
    microsoftEmailId,
  } = formData;

  const val3idateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      <Flex direction={{ base: "column", lg: "row" }} gap={"2em"}>
        <Input
          fontSize="15px"
          flex={1}
          label={"Google gmail ID"}
          required
          name="googleGmailId"
          value={googleGmailId}
          onChange={onChange}
        />

        <Input
          fontSize="15px"
          flex={1}
          label={"Apple Email ID"}
          required
          name="appleEmaailId"
          value={googleGmailId}
          onChange={onChange}
        />
      </Flex>

      <Flex direction={{ base: "column", lg: "row" }} gap={"2em"}>

          <Input
            label='Skype ID'
            type="text"
            name="skypeID"
            value={skypeId}
            onChange={(e) => onChange(e)}
            flex={1}
          />

          <Input
            label='Timezone Url'
            type="text"
            name="timeZoneUrl"
            value={timeZoneUrl}
            onChange={(e) => onChange(e)}
            flex={1}
          />


      </Flex>


      <Flex direction={{ base: "column", lg: "row" }} gap={"2em"}>


          <Input
            label='Days Per Week'
            type="text"
            name="daysPerWeek"
            value={daysPerWeek}
            onChange={(e) => onChange(e)}
            flex={1}
          />
          

          <Input
            label='Hours Per Day'
            type="text"
            name="hoursPerDay"
            value={hoursPerDay}
            onChange={(e) => onChange(e)}
            flex={1}
          />

      </Flex>


      <Flex direction={{ base: "column", lg: "row" }} gap={"2em"}>


          <Input
            label='Start Date'
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => onChange(e)}
            flex={1}
          />
          <Box flex={1}></Box>
          


      </Flex>

      <Flex gap='2em' mt='2em'>
        <Btn onClick={(e) => proceed(e)}>Next</Btn>
        <Btn variant={'fade'}>Back</Btn>
      </Flex>



    </>
  );
};

export default FormWorkDetails;
