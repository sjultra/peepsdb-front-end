import UserWorkspace from "../../components/workspace"
import AdminAsideBar from "../../components/layouts/AdminAsideBar"

const AdminWorkspace = () => {
  return (
    <AdminAsideBar>
      <UserWorkspace />
    </AdminAsideBar>
  )
}

export default AdminWorkspace
