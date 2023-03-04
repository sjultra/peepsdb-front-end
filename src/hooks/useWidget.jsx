import { useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import ConnectSocialWidget from "../components/form/Onboarding/ConnectSocialWidget";
import { selectWidget, widgetActions } from "../store/reducers/widget"


const useWidget = ()=>{

    const {openMod,closeMod,setLoading:setL}  = widgetActions;
    
    const dispatch = useDispatch();

    const {onOpen,onClose,isOpen} = useDisclosure()

    const {loading,modal} = useSelector(selectWidget);

    const setLoading = useCallback(payload=>{dispatch(setL(payload))},[dispatch,setL]);

    const openSocialConnectPopup  = ({url,customUrl})=>{
        openModal({
          children:ConnectSocialWidget,
          payload:{
            ...url?{url}:{},
            ...customUrl?{customUrl}:{}
          }
        });
    }
      
    const openModal = useCallback(async({children,size,payload,onClose})=>{
        // console.log('opening modal',isOpen)
        
        dispatch(openMod({
            payload,
            isOpen:true,
            children,
            size,
            onClose
        }));
    },[dispatch,openMod,onOpen,isOpen]);
    
    const closeModal = useCallback(()=>{
        dispatch(closeMod());
    },[closeMod,onClose,dispatch])


    const toast = useToast();


    const openToast = {
        'success':({title,description,duration,isClosable})=>{
            toast({
                status:'success',
                position:'top',
                title:title || 'Request successful',
                description,
                duration,
                isClosable
                                
            })
        },
        'fail':({title,description,duration,isClosable})=>{
            toast({
                status:'error',
                position:'top',
                title:title || 'Request failed',
                description,                
                duration,
                isClosable
            })
        }

    }


    return{
        loading,
        modal,
        setLoading,
        openModal,
        closeModal,
        openSocialConnectPopup,
        isOpen,
        openToast
    }
}

export default useWidget