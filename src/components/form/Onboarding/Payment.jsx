import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import Header from '../../../widgets/Text'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState } from "react"
import Input from "../../../widgets/Input"
import Btn from "../../../widgets/Button"

const Payment = ({
    nextStep,
    prevStep,
    onChange,
    formData,
    setValue,
    loading,
    profile,
  })=>{

    const [method,setMethod] = useState('payoneer')

    return(
        <Flex h='full'>
            <Box p='1em 1.5em' flex={1} h='full'>

                <Header  mt='1em'> Payment Method</Header>
                <RadioGroup fontSize={'16px'} onChange={setMethod} value={method}>
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
                

                <Btn full display='block' mt='3em' >
                    Submit
                </Btn>     

                <Btn full mt='2em' variant={'fade'}  >
                    Prev
                </Btn>     

            </Box>
            <Box p='1em 1.5em' flex={1} borderLeft='1px solid #E5E5E5' minH='100%'> 

                <Header  mt='1em'> Enter Account Details Below</Header>
                
                <Input                 
                 inputStyles='height:45px' labelStyles='margin: 1rem 0;' 
                 label='Bank name' name='bankName' />

                <Input label='Account number' inputStyles='height:45px' 
                 labelStyles='margin: 1rem 0;'
                 mt='0.5em' name='accountNumber' />

                <Input label='Account type' inputStyles='height:45px' 
                 labelStyles='margin: 1rem 0;' mt='0.5em' name='accountNumber' />

                <Input label='Account type' inputStyles='height:45px' 
                 mt='0.5em' name='bankAddress' />

                <Input label='Routing(ABA)' inputStyles='height:45px' 
                 mt='0.5em' name='routing' />

            </Box>
        </Flex>
    )
}


export default Payment