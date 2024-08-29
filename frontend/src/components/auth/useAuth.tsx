import { useContext } from "react"
import { AppContext } from "./AppProvider"

export const useAuth = () => {
	return useContext(AppContext)
}
