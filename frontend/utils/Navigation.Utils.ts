import type {Moment} from "moment";

export const navigateByRouteName = async (
  routeName: string,
  params?: Record<string, string | number | Moment>,
  query?: Record<string, string | number | boolean>
): Promise<void> => {
  const localePath = useLocalePath();

  const name = localePath({
    name: routeName,
    params: params ?? {}
  });

  console.log(routeName, params, name);

  await navigateTo({
    path: name,
    query: query ?? {}
  });
};