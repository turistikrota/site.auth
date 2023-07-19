export enum Services {
  Auth = 'auth',
}

export const ApiUrls: Record<Services, string> = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL!,
}

export const apiUrl = (service: Services, path: string) => `${ApiUrls[service]}${path}`
