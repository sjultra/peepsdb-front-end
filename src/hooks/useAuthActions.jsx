import { useContext } from "react"
import { AppContext } from "../contextStore"



const useAuthActions = ()=>{

    const [,setAppState] = useContext(AppContext);

    const logout = ()=>{
        localStorage.removeItem('peepsdb-auth');
        setAppState({});
    }

    return {
        logout
    }

}

export default useAuthActions;