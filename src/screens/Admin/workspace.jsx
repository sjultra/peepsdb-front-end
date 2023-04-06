import UserWorkspace from "../../components/workspace"
import AdminAsideBar from "./AdminAsideBar"

const AdminWorkspace = () => {
  return (
    <AdminAsideBar>
      <UserWorkspace />
    </AdminAsideBar>
  )
}

export default AdminWorkspace