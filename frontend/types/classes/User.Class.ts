import type {Language} from "@/types/Core.Types";

export class User {
  private language: Language;

  constructor(language: Language) {
    this.language = language;
  }

  getLanguage(): Language {
    return this.language;
  }

  public setUserLanguage(language: Language): void {
    console.log('set language');
    const { locale } = useI18n()
    const switchLocalePath = useSwitchLocalePath()

    switchLocalePath(language.i18nCode);

    console.log(locale);
  }

  setLanguage(language: Language): void {
    this.language = language;
  }
}