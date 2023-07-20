export type VerifyFailResponse = {
  email: string
  reSendable: boolean
}

export type VerifyRequiredForLoginResponse = {
  verifyRequired: boolean
}

export function isVerifyFailResponse(arg: unknown): arg is VerifyFailResponse {
  const v = arg as VerifyFailResponse
  return typeof v.email === 'string' && typeof v.reSendable === 'boolean'
}

export function isVerifyRequiredForLoginResponse(arg: unknown): arg is VerifyRequiredForLoginResponse {
  const v = arg as VerifyRequiredForLoginResponse
  return typeof v.verifyRequired === 'boolean'
}
