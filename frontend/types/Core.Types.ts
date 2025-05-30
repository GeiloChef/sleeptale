export enum MomentFormat {
  DateUrl =  "DD-MM-YYYY",
  DateDisplay =  "DD.MM.YYYY",
  UrlParam = "YYYY-MM-DD"
}

export interface Dictionary<T> {
  value: T,
  label: string
}