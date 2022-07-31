import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectWidget, widgetActions } from "../store/reducers/widget"


const useWidget = ()=>{

    const {setModal:setM,setLoading:setL}  = widgetActions;
    const dispatch = useDispatch();

    const {loading,modal} = useSelector(selectWidget);

    const setLoading = useCallback(payload=>dispatch(setL(payload)),[dispatch,setL]);

    const setModal = useCallback(payload=>dispatch(setM(payload)),[dispatch,setM]);
    

    return{
        loading,
        modal,
        setLoading,
        setModal
        

    }
}

export default useWidget