export default async function authUser(token: string) {
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/me", {
          method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        const data = await response.json()
        console.log("🆘 USER DATA", data);
        
        return data
      } catch (error) {
        console.error("🆘", error)
        return false
      }
}