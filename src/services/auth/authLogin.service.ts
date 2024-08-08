import setCookie from "../cookies/cookiesHandler.service";
import authUser from "./authUser.service";

export default async function authLogin(username: string, password: string) { 
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
        const response = await fetch("http://localhost:8000/auth/token", {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        
        if (await authUser(data.access_token) === false) return false
        if (response.status === 200) setCookie("token", data.access_token)
        return true
        
    } catch (error) {
        console.error("🆘", error)
        return false
    }
  }