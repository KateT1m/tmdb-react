import { IControlItem, IMenuItem } from "../types/types";

type ControlFieldConfig =
  | {
      type: "text";
      label: string;
      key: string;
    }
  | {
      type: "select";
      label: string;
      key: string;
      menuItems: IMenuItem[];
    };

export const createControlPanelConfig = (
  fields: ControlFieldConfig[],
  state: Record<string, string>,
  setters: Record<string, (value: string) => void>
): IControlItem[] => {
  return fields.map((field) => {
    const currentValue = state[field.key];
    const onChange = setters[field.key];

    if (!onChange) {
      console.warn(`Setter for key "${field.key}" not provided`);
    }

    const baseItem = {
      label: field.label,
      value: currentValue,
      onChange: (value: string) => onChange(value),
      controlType: field.type,
    };
    if (field.type === "select") {
      return {
        ...baseItem,
        menuItems: field.menuItems,
      };
    }
    return baseItem;
  });
};
