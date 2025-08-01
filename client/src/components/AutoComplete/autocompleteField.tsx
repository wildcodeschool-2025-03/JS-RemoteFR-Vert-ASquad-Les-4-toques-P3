import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./autocompleteField.css";

type IngredientOption = {
  name?: string;
  nom?: string;
  id?: number;
  [key: string]: string | number | undefined;
};

type AutocompleteFieldProps = {
  options: IngredientOption[];
  label: string;
  placeholder?: string;
  onChange: (value: IngredientOption | string | null) => void;
  freeSolo?: boolean;
};

export default function AutocompleteField({
  options,
  placeholder = "",
  onChange,
  freeSolo = true,
}: AutocompleteFieldProps) {
  const [value, setValue] = useState<IngredientOption | null>(null);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: IngredientOption | string | null,
  ) => {
    if (typeof newValue === "string") {
      const newIngredient = { name: newValue };
      setValue(newIngredient);
      onChange(newIngredient);
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleInputChange = (
    _event: React.SyntheticEvent,
    newInputValue: string,
  ) => {
    if (newInputValue) {
      const newIngredient = { name: newInputValue };
      setValue(newIngredient);
      onChange(newIngredient);
    }
  };

  return (
    <Autocomplete
      className="autocomplete-field"
      value={value}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return option.name || option.nom || "";
      }}
      renderInput={(params) => (
        <TextField {...params} label={null} placeholder={placeholder} />
      )}
      freeSolo={freeSolo}
      selectOnFocus
      clearOnBlur={false}
      slotProps={{
        popper: {
          placement: "bottom-start",
          disablePortal: true,
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: "document",
                padding: 8,
              },
            },
          ],
        },
      }}
    />
  );
}
