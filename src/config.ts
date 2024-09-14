import { fetchAPICredentialsInterceptor } from "./services/interceptors/fetchAPICredentialsInterceptor"

export const configApp = () => {
  fetchAPICredentialsInterceptor()
}
