import { useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectWidget, widgetActions } from "../store/reducers/widget"


const useWidget = ()=>{

    const {openMod,closeMod,setLoading:setL}  = widgetActions;
    
    const dispatch = useDispatch();

    const {onOpen,onClose,isOpen} = useDisclosure()

    const {loading,modal} = useSelector(selectWidget);

    const setLoading = useCallback(payload=>{dispatch(setL(payload))},[dispatch,setL]);

    const openModal = useCallback(payload=>{
        onOpen();
        console.log('opening payload',payload)
        dispatch(openMod({
            ...payload,
            isOpen,
        }));
    },[dispatch,openMod,onOpen,isOpen]);
    
    const closeModal = useCallback(()=>{
        onClose();
        dispatch(closeMod());
    },[closeMod,onClose,dispatch])

    return{
        loading,
        modal,
        setLoading,
        openModal,
        closeModal,
        isOpen,
    }
}

export default useWidget