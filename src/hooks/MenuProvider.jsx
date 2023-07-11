import React from "react"

const MenuContext = React.createContext({
  isopen: false,
})

// handle displaying menu
export const useMenu = () => {
  return React.useContext(MenuContext)
}

export const MenuProvider = ({ children }) => {
  const [isopen, setMenuStatus] = React.useState(false)

  return (
    <MenuContext.Provider value={{ isopen, setMenuStatus }}>
      {children}
    </MenuContext.Provider>
  )
}
