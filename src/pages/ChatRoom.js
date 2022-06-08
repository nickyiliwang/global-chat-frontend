import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import SelectLanguage from "../Components/websockets/SelectLanguage";
import { w3cwebsocket } from "websocket";

let client;
export default function ChatRoom() {
  const [userId, setUserId] = React.useState("");
  const [messageToSend, setMessageToSend] = React.useState("");
  const [prefLang, setPrefLang] = React.useState("en");
  const [messagesToRender, setMessagesToRender] = React.useState([]);

  //   React.useEffect(() => {
  //     console.log(messagesToRender);
  //   }, [messagesToRender]);

  React.useEffect(() => {
    client = new w3cwebsocket(
      "ws://localhost:3001/"
      // "wss://1yryn2nkab.execute-api.us-east-1.amazonaws.com/dev"
    );
    client.error = function () {
      console.log("WebSocket Client error , connection closed");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected");

      client.send(
        JSON.stringify({
          action: "welcome",
        })
      );
    };
    client.onmessage = async (e) => {
      const { type, connectionId, sender, message, translated } = JSON.parse(
        e.data
      );

      switch (type) {
        case "welcome":
          setUserId(connectionId);
          break;

        case "system":
          console.log("system:", message);
          break;

        case "translated":
          // {"type":"translated","connectionId":"cl4569umz0020ysbxdgpt95w6","sender":"cl4569umz0020ysbxdgpt95w6","message":"Hello !","sourceLang":"en","translated":{"TranslatedText":"你好！","SourceLanguageCode":"en","TargetLanguageCode":"zh"}}

          if (sender === connectionId) {
            const local = {
              message: message,
              side: "right",
            };
            setMessagesToRender((prevState) => [...prevState, local]);
          } else {
            const remote = {
              message: translated.TranslatedText,
              side: "left",
            };
            setMessagesToRender((prevState) => [...prevState, remote]);
          }

          break;

        default:
          break;
      }
    };

    return () => {
      console.log("connection closed");
      client.close();
    };
  }, []);

  const handleMessageToSendChange = (event) => {
    if (event.target.value === "") return;
    setMessageToSend(event.target.value);
  };

  const handleSendingMessageToServer = () => {
    if (messageToSend === "") return;

    const params = {
      action: "public",
      sender: userId,
      message: messageToSend,
      sourceLang: prefLang,
    };
    // console.log("sending", params);
    client.send(JSON.stringify(params));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleLangChange = (lang) => {
    setPrefLang(lang);
    client.send(
      JSON.stringify({
        action: "setLang",
        prefLang: lang,
      })
    );
  };

  const renderMessages = () => {
    return messagesToRender.map((msg, i) => {
      return (
        <ListItem key={i}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align={msg.side}
                primary={msg.message}
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align={msg.side} secondary="00:00"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      );
    });
  };

  return (
    <div className="h-screen">
      <Grid container component={Paper} className="">
        <Grid
          item
          xs={3}
          styles={{
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="NickWang" />
              </ListItemIcon>
              <ListItemText primary="Nick Wang"></ListItemText>
              <SelectLanguage handleLangChange={handleLangChange} />
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="NickWang">
              <ListItemIcon>
                <Avatar
                  alt="NickWang"
                  src="https://material-ui.com/static/images/avatar/8.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Nick Wang">Nick Wang</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>

            <ListItem button key="YingWei">
              <ListItemIcon>
                <Avatar
                  alt="Di YingWei"
                  src="https://material-ui.com/static/images/avatar/8.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Di YingWei">Di YingWei</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className="h-85v">{renderMessages()}</List>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  label="Type Something"
                  fullWidth
                  onChange={handleMessageToSendChange}
                  // defaultValue={messageToSend}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Button
                  style={{ padding: "15px", marginLeft: "5px" }}
                  onClick={handleSendingMessageToServer}
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
