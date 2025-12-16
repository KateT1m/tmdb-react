import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IControlItem } from "../types/types";

interface IControlPanelProps {
  items: IControlItem[];
}

const ControlPanel: React.FC<IControlPanelProps> = ({ items }) => {
  return (
    <>
      {items.map((item) =>
        item.controlType === "text" ? (
          <TextField
            key={item.label}
            label={item.label}
            value={item.value}
            onChange={(e) => item.onChange(e.target.value)}
          />
        ) : (
          <FormControl key={item.label}>
            <InputLabel>{item.label}</InputLabel>
            <Select
              value={item.value}
              label={item.label}
              onChange={(e) => item.onChange(e.target.value as string)}
            >
              {item.menuItems?.map((menuItem) => (
                <MenuItem key={menuItem.value} value={menuItem.value}>
                  {menuItem.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      )}
    </>
  );
};

export default ControlPanel;
