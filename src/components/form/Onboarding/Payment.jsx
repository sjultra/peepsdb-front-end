import { Box, Flex, Select, Text } from "@chakra-ui/react"
import Header from '../../../widgets/Text'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState } from "react"
import Input from "../../../widgets/Input"
import Btn from "../../../widgets/Button"
import { FormRow } from "./UserForm"
import { AiFillEdit } from "react-icons/ai"
import TextInput from "../../../widgets/Text"
import { useMemo } from "react"

const Payment = ({
    nextStep,
    prevStep,
    onChange,
    formData,
    setValue,
    loading,
    profile,
    preview
  })=>{

    const {
        paymentEmail,bankName,accountNumber,
        routing,paymentMethod,accountType
    } = formData;

    const setMethod = (value)=>setValue('paymentMethod',value)

    const checkform = useMemo(()=> console.log('formdata value',formData) , [formData])

    const onboardingView = 
    <Flex h='full'>
   
        <Box p='1em 1.5em' flex={1} h='full'>

            <Header  mt='1em'> Payment Method</Header>
            <RadioGroup fontSize={'16px'} onChange={setMethod} value={paymentMethod}>
                <Flex mt='1.5em' align={'center'} bg='var(--fadebg)' borderRadius={'5px'} 
                p='0.6em 1.2em' justify={'space-between'} >
                    <Text>Payoneer </Text>
                    <Radio fontSize={'50px'} size='lg' value='payoneer'/>
                </Flex>

                <Flex mt='2em' align={'center'} bg='var(--fadebg)' borderRadius={'5px'} 
                p='0.6em 1.2em' justify={'space-between'} >
                    <Text>Wise </Text>
                    <Radio fontSize={'50px'} size='lg' value='wise'/>
                </Flex>

                <Flex mt='2em' align={'center'} bg='var(--fadebg)' borderRadius={'5px'} 
                p='0.6em 1.2em' justify={'space-between'} >
                    <Text>Rimut </Text>
                    <Radio fontSize={'50px'} size='lg' value='rimut'/>
                </Flex>


            </RadioGroup>           
            
            <Btn full onClick={()=>{
                console.log('form at step4',formData);
                nextStep()
                }} display='block' mt='3em' >
                Next
            </Btn>     

            <Btn full mt='2em' variant={'fade'}  >
                Prev
            </Btn>     

        </Box>

        <Box p='1em 1.5em' flex={1} borderLeft='1px solid #E5E5E5' minH='100%'> 

            <Header  mt='1em'> Enter Account Details Below</Header>

            <Input value={paymentEmail} onChange={ onChange}
            inputStyles='height:45px' labelStyles='margin: 1rem 0;' 
            label='Payment email' name='paymentEmail' />

            <Input value={bankName} onChange={onChange}                
            inputStyles='height:45px' labelStyles='margin: 1rem 0;' 
            label='Bank name' name='bankName' />

            <Input label='Account number' inputStyles='height:45px' 
             labelStyles='margin: 1rem 0;' value={accountNumber} onChange={onChange}
             mt='0.5em' name='accountNumber' />

            <Input label='Account type' inputStyles='height:45px' 
             mt='0.5em' name='accountType' value={accountType} onChange={onChange} />

            <Input label='Routing(ABA)' inputStyles='height:45px' 
            mt='0.5em' name='routing' value={routing} onChange={onChange} />

        </Box>

    </Flex>

    const previewMode = 
    
    <>
        <Flex my='0.8em' align={'center'} justify={'space-between'}>
          <TextInput variant={'s2'}>Payment Details</TextInput>
          
          <Btn  px='1.2em' h='40px' variant={'fade'} rightIcon={<AiFillEdit fontSize={'14px'} />} >Edit</Btn>

        </Flex>

        <FormRow>
            <Input
             flex={1}
             label='Payment Method' 
             name='paymentMethod'
             selectChild={ <Select defaultValue={paymentMethod} onChange={onChange}  >
                <option> Payoneer </option>
                <option> Wise </option>
                <option> Rimut </option>

             </Select> } 
            />

            <Input
             flex={1}
             label='Payment Email' 
             name='paymentEmail'
             value={paymentEmail}
             preview={preview}
             onChange={onChange}
            />


        </FormRow>


        <FormRow mt='1.2em'>

            <Input
             flex={1}
             label='Bank Name' 
             name='paymentEmail'
             value={paymentEmail}
             preview={preview}
             onChange={onChange}
            />


            <Input
             flex={1}
             label='Account Number' 
             name='accountNumber'
             value={accountNumber}
             preview={preview}
             onChange={onChange}
            />



        </FormRow>


        <FormRow mt='1.2em'>

            <Input
             flex={1}
             label='Account Type' 
             name='accountType'
             value={accountType}
             preview={preview}
             onChange={onChange}
            />


            <Input
             flex={1}
             label='Routing(ABA)' 
             name='routing'
             value={routing}
             preview={preview}
             onChange={onChange}
            />



        </FormRow>

            
    
    
    </>

    return(
        preview? previewMode: onboardingView
    )
}


export default Payment;