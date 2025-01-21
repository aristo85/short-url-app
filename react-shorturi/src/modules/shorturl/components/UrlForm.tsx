import React, { FC } from "react";
import UploadIcon from "@mui/icons-material/Upload";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setChange: (value: string) => void;
  label: string;
};

const UrlForm: FC<Props> = ({ handleSubmit, value, setChange, label }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={(e) => setChange(e.target.value)}
        placeholder={`Enter ${label}`}
      />
      <button className="submit" disabled={!value}>
        <UploadIcon />
      </button>
    </form>
  );
};

export default UrlForm;
