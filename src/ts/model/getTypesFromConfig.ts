import * as typesConfig from "../../resources/types.json";

export function getTypesFromConfig(): Array<string> {
  const typesFromConfig: Array<string> = typesConfig.types;
  return typesFromConfig;
}
