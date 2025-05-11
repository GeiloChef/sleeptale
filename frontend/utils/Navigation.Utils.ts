import type {Moment} from "moment";

export const navigateByRouteName = async (routeName: string, params?: Record<string, string | number | Moment>): Promise<void> => {
  const localePath = useLocalePath();
  const name = localePath({
    name: routeName,
    params: params ?? {}
  });
  await navigateTo(name);
}