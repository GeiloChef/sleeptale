import type {Language} from "@/types/Core.Types";
import { AgeGroupTypes } from "@/types/Story.types";

export class User {
  private finishedInitialSetup: boolean;
  private language: Language;
  private ageGroup: AgeGroupTypes;

  constructor(language: Language) {
    this.finishedInitialSetup = false;
    this.language = language;
    this.ageGroup = AgeGroupTypes.Kids
  }

  public getLanguage(): Language {
    return this.language;
  }

  public hasInitialSetupFinished(): boolean {
    return this.finishedInitialSetup;
  }

  public setUserLanguage(language: Language): void {
    const { locale } = useI18n()
    const switchLocalePath = useSwitchLocalePath()

    switchLocalePath(language.i18nCode);
  }

  public setUserAgeGroup(newAgeGroup: AgeGroupTypes): void {
    this.ageGroup = newAgeGroup;
  }

  public getUserAgeGroup(): AgeGroupTypes {
    return this.ageGroup;
  }

  public finishInitialSetup(): void {
    this.finishedInitialSetup = true;
  }
}