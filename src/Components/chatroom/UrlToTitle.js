import React from "react";
import axios from "axios";

export default function UrlToTitle() {
  const [url, setUrl] = React.useState("");
  const [linksCount, setLinksCount] = React.useState(1);
  const [output, setOutput] = React.useState([]);
  const server = process.env.REACT_APP_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <div key={count}>
          <p>{`[${count}]: ${title}`}</p>
          <p>{url}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter url:
          <input
            type="text"
            placeholder="https://www.google.com/"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="output">{renderList()}</div>
    </div>
  );
}
