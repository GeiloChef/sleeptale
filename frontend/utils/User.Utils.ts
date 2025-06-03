import type {Language} from "@/types/Core.Types";

export const getAvailableLanguages = (): Language[] => {
  const { t } = useI18n();

  return [
    {
      id: 'en',
      label: 'English',
      deeplCode: 'EN',
      i18nCode: 'en',
      flagCode: 'gb',
    },
    {
      id: 'es',
      label: 'Español',
      deeplCode: 'ES',
      i18nCode: 'es',
      flagCode: 'es',
    },
    {
      id: 'de',
      label: 'Deutsch',
      deeplCode: 'DE',
      i18nCode: 'de',
      flagCode: 'de',
    },
  ]
}