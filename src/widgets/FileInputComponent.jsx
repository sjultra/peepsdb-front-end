import { Box, Image, Input, useToast } from "@chakra-ui/react";
import { BiCamera } from "react-icons/bi";


export const RenderFileImage = (img,icon,rad)=>
img? 
<Image src={typeof(img)==='string'?img:URL.createObjectURL(img)} 
 w='100%' h='100%' borderRadius={rad || '15px'} />:
icon



const FileInputComponent = ({
    icon,
    setOnChange,
    iconColor,
    iconFontSize,
    supportedFormats,
    inputRef,
    ...rest
})=>{
    // export const IMG_FILE_SIZE = 10000;
    const IMG_FILE_SIZE = 100000000000000;

    // application/x-zip-compressed

    const extra_supported = supportedFormats || []
    const IMG_SUPPORTED_FORMATS = ['png', 'jpg', 'jpeg', 'image/png', 'image/jpg','image/jpeg',...extra_supported];

    let toast = useToast();


    return( 
      <>
        <input type='file' style={{width:"100%"}} />

        <Box position='relative' {...rest}>
            <Input type='file' opacity={0} 
             {...(inputRef && {ref: inputRef})}
             onChange={e=>{
                let img = e.target.files[0];
                let error = ''
                if (img.size > IMG_FILE_SIZE) {
                  error = "Image size is too large";
                } 
                else if (!IMG_SUPPORTED_FORMATS.includes(img.type)) {
                  error = "Unsupported image format";
                }

                if (error) {
                  toast({
                    title: "Error: Image",
                    description: `${error}`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                  });
                } 
                else {
                  setOnChange(img)
                  
                }              
             }} w='100%' h='100%' 
             position={'absolute'} left={0} top={0} />
             {
              icon ||                
              <BiCamera color={ iconColor || 'initial'} 
                fontSize={iconFontSize || '40px'}
              />
            }
        </Box>
      </>

    )
}


export default FileInputComponent