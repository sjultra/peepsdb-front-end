import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {  AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import styled from "styled-components";
import { MdOutlineEdit} from 'react-icons/md'
import { renderJSX } from "../utils/helpers";

const InputElement = ({required,label,name,type,onChange,value,
  inputStyles,containerStyles,labelStyles,h,fontSize,className,autofocus,preview,selectChild,...rest})=>{

    const [showPassword,setShowPassword] = useState(false)


    const [previewFocused,setPreviewFocused] = useState( preview? 'unfocused':'')

    const previewRef = useRef();
    
    const inputStyle = previewFocused ==='unfocused'?{
      border:'none',
      borderRadius:`12px`,
      background:'white',
    }:{      
      // border:`2px solid #f1f1f1`,
      border: `1.36937px solid rgba(4, 9, 33, 0.04)`,
      borderRadius:`12px`,
      background:'#E8E8E8'
    }

    const clickEventOnPreview = preview?{
      onBlur:()=>setPreviewFocused('unfocused')
    }:{};


    return(
      <Box {...rest} className={className}>
          <label htmlFor={name}>
                {label} { required? <span>*</span>:''}
          </label>
          {/* display select / input field accordingly */}
          {
            renderJSX(
              selectChild,
              selectChild,
              <InputGroup>
                  <Input
                    background= {`rgba(4, 9, 33, 0.04)`}
                    type={type==='password'? showPassword? 'text':'password'  :  (type || 'text')}
                    name={name}
                    fontSize={fontSize}
                    value={value}
                    ref={previewRef}
                    pointerEvents={preview && previewFocused==='unfocused'? 'none':'initial'}
                    onChange={(e)=>onChange(e)}
                    {...clickEventOnPreview}
                    {...inputStyle}
                  />
                  {type==='password' || preview?
                      <InputRightElement justifyContent={'center'} minW={preview?'35px':'initial'}  display='flex' align='center' h='100%'> 
                          {
                            preview?
                            <MdOutlineEdit fontSize={'19px'} cursor='pointer'  onClick={()=>{
                              setPreviewFocused('focused');
                              previewRef.current?.focus();
                            }} />:
                            showPassword?
                            <BsEye className="bseye" cursor={'pointer'} onClick={()=>(setShowPassword(prev=>!prev))} fontSize={'26px'}/>:
                            <AiOutlineEyeInvisible cursor='pointer' onClick={()=>(setShowPassword(prev=>!prev))} fontSize={'26px'} />
                          }

                      </InputRightElement>
                      :<></>
                  }
              </InputGroup>
            )            
          }

      </Box>


        
    )

}

export default styled(InputElement)`
  display: flex;
    flex-direction: column;
    ${props=>props.containerStyles};
    label {
      margin: 1rem 0;
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
      border: 1.36937px solid rgba(4, 9, 33, 0.04);
      border-radius:12px;

    }

`;
  

 


