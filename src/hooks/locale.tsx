import Cookies from "js-cookie";

export const useCurrentLocale = () : string => {
  const currentLocale = Cookies.get('i18next') || 'en';
  return currentLocale;
}