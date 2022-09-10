import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import {  AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import styled from "styled-components";


const InputElement = ({required,label,name,type,onChange,value,
  inputStyles,containerStyles,labelStyles,h,fontSize,className,autofocus,...rest})=>{

    const [showPassword,setShowPassword] = useState(false)

    return(
      <Box {...rest} className={className}>

            <label htmlFor={name}>
                  {label} { required? <span>*</span>:''}
            </label>
            <InputGroup>
                <Input
                 type={type==='password'? showPassword? 'text':'password'  :  (type || 'text')}
                 name={name}
                 fontSize={fontSize}
                 value={value}
                 onChange={(e)=>onChange(e)}
                />
                {type==='password'?
                    <InputRightElement px='0.6em' display='flex' align='center' h='100%'> 
                        {
                            showPassword?
                            <BsEye className="bseye" cursor={'pointer'} onClick={()=>(setShowPassword(prev=>!prev))} fontSize={'26px'}/>:
                            <AiOutlineEyeInvisible cursor='pointer' onClick={()=>(setShowPassword(prev=>!prev))} fontSize={'26px'} />
                        }

                    </InputRightElement>
                    :<></>
                }
            </InputGroup>

      </Box>


        
    )

}

export default styled(InputElement)`
  display: flex;
    flex-direction: column;
    ${props=>props.containerStyles};
    label {
      margin: 2rem 0 1rem 0;
      color: rgba(4, 9, 33, 0.76);
      font-size:15px;
      ${props=>props.labelStyles};
    }

    span {
      color: #ff0000;
    }
  
    input,
    select {
      height: 50px;
      border: 2px solid #f1f1f1;
      padding: 0 2rem;
      background: rgba(4, 9, 33, 0.04);
      /* Black / Black 4 (Dark background) */
  
      border: 1.36937px solid rgba(4, 9, 33, 0.04);
      border-radius: 12px;
      ${props=>props.inputStyles};
  
      &:focus {
        outline: 0;
        border: 2px solid #5e55ef;
      }
    }
  
    select {
      background: #fff;
    }

`;
  

 


