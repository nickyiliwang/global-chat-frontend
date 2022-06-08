import React from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export default function UrlToTitle() {
  const [url, setUrl] = React.useState("");
  const [linksCount, setLinksCount] = React.useState(1);
  const [output, setOutput] = React.useState([]);
  const server = process.env.REACT_APP_FUNCTION_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url === "") return;
    try {
      // {title: 'Google', url: 'https://www.google.com/'}
      const { data } = await axios.post(server, {
        url,
      });

      const newData = { ...data, count: linksCount };

      setOutput((output) => [...output, newData]);
      setLinksCount(linksCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = () => {
    return output.map(({ title, url, count }) => {
      return (
        <div key={count} style={{ padding: "20px" }}>
          <p>{`[${count}]: ${title}`}</p>
          <p>{url}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={8}>
            <TextField
              label="Enter url"
              fullWidth
              placeholder="https://www.google.com/"
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              style={{ padding: "15px", marginLeft: "5px" }}
              onClick={handleSubmit}
              variant="contained"
              size="large"
              endIcon={<SendIcon />}
              type="submit"
            >
              Submit Url
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="output">{renderList()}</div>
    </div>
  );
}
