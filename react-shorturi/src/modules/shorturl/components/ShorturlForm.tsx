import { FC, FormEvent, useState } from "react";
import { useAddShorturlMutation } from "../shorturlApi";
import UrlForm from "./UrlForm";

const ShorturlForm: FC = () => {
  const [newurl, setNewurl] = useState("");
  const [shortened, setShortened] = useState({ originalUrl: "", shortUrl: "" });

  const [addShorturl] = useAddShorturlMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //addShorturl
    try {
      const res = await addShorturl({ originalUrl: newurl }).unwrap();
      setShortened({ shortUrl: res.shortUrl ?? "", originalUrl: newurl });
    } catch (err) {
      console.error("Failed to add shorturl:", err);
    }
    setNewurl("");
  };

  return (
    <>
      <UrlForm
        label="New URL"
        handleSubmit={handleSubmit}
        setChange={setNewurl}
        value={newurl}
      />
      <p style={{ display: shortened.shortUrl ? "block" : "none" }}>
        the shorten of <strong>{shortened.originalUrl}</strong> is:{" "}
        <strong>{shortened.shortUrl}</strong>
      </p>
    </>
  );
};

export default ShorturlForm;
