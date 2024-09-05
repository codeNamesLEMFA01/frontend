import { IErrorApi, ILoginSuccessApi, IRegisterSuccessApi } from "../auth.types"

export function isApiError(
  data: ILoginSuccessApi | IRegisterSuccessApi | IErrorApi,
): data is IErrorApi {
  return (data as IErrorApi).detail !== undefined
}
