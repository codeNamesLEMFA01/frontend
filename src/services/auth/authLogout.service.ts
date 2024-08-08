import { deleteCookie } from "../cookies/cookiesHandler.service"

export default function authLogout() {
    deleteCookie("token")
}