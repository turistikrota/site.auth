export type VerifyFailResponse = {
  email: string
  reSendable: boolean
}

export function isVerifyFailResponse(arg: any): arg is VerifyFailResponse {
  return arg && arg.email !== undefined && arg.reSendable !== undefined
}
