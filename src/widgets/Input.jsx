import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {  AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import styled from "styled-components";
import {GrFormEdit} from 'react-icons/gr'

const InputElement = ({required,label,name,type,onChange,value,
  inputStyles,containerStyles,labelStyles,h,fontSize,className,autofocus,preview,...rest})=>{

    const [showPassword,setShowPassword] = useState(false)

    const previewRef = useRef('unfocused');
    
    const inputStyle = previewRef.current ==='unfocused'?{
      background:'transparent',
      border:'none'
    }:{      
      border: `1.36937px solid rgba(4, 9, 33, 0.04)`,
      borderRadius:`12px`
    }

    const clickEventOnPreview = preview?{
      onBlur:()=>previewRef.current = 'unfocused'
    }:{};


    return(
      <Box {...rest} className={className}>
          <label htmlFor={name}>
                {label} { required? <span>*</span>:''}
          </label>
          <InputGroup>
              <Input
                background= {`rgba(4, 9, 33, 0.04)`}
                type={type==='password'? showPassword? 'text':'password'  :  (type || 'text')}
                name={name}
                fontSize={fontSize}
                value={value}
                onChange={(e)=>onChange(e)}
                {...clickEventOnPreview}
                {...inputStyle}
              />
              {type==='password' || preview?
                  <InputRightElement px='0.6em' display='flex' align='center' h='100%'> 
                      {
                        preview?
                        <GrFormEdit fontSize={'26px'} onClick={()=>previewRef.current='focused'} />:
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
      /* Black / Black 4 (Dark background) */
      
      ${props=>props.inputStyles}
  
      &:focus {
        outline: 0;
        border: 2px solid #5e55ef;
      }
    }
  
    select {
      background: #fff;
    }

`;
  

 


