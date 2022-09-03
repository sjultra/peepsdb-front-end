import { useToast } from "@chakra-ui/react";


const useFileUpload =()=>{

    const extra_supported = supportedFormats || []

    const IMG_SUPPORTED_FORMATS = ['png', 'jpg', 'jpeg', 'image/png', 'image/jpg','image/jpeg',...extra_supported];

    let toast = useToast();

    const onChangeCb=(e,setImg)=>{
        let img = e.target.files[0];
        let error = '';

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
            setImg(img);   
        }              
    }

    return {
        onChangeCb
    }
    
}


export default useFileUpload;