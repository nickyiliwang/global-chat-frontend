import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { languages } from "./languages";

export default function SelectLanguage({ handleLangChange }) {
  const [prefLang, setPrefLang] = React.useState("en");

  const handleChange = (event) => {
    setPrefLang(event.target.value);
    handleLangChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select value={prefLang} label="Language" onChange={handleChange}>
          {languages.map(({ language, code }) => {
            return (
              <MenuItem key={code} value={code}>
                {language}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

// https://docs.aws.amazon.com/translate/latest/dg/what-is-languages.html
