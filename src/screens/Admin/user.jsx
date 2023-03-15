import UserScreen from "../User/UserScreen"
import AdminAsideBar from "./AdminAsideBar";



const User= ()=>{
    return(
        <AdminAsideBar>
            <UserScreen/>
        </AdminAsideBar>
    )
}

export default User