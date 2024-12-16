import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

const ExtraNoteEvent = ({ text, setText }) => {
  const [copyButtonText, setCopyButtonText] = React.useState("Copy All");

  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyButtonText("Copied");
    });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    setCopyButtonText("Copy All");
  };

  return (
    <Textarea
      placeholder="Type in here…"
      value={text}
      onChange={handleTextChange}
      minRows={2}
      maxRows={4}
      startDecorator={
        <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("👍")}
            className="bgHover"
          >
            👍
          </IconButton>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("💯")}
            className="bgHover"
          >
            💯
          </IconButton>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("😍")}
            className="bgHover "
          >
            😍
          </IconButton>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ ml: "auto" }}
            onClick={handleCopyAll}
          >
            {copyButtonText}
          </Button>
        </Box>
      }
      endDecorator={
        <Typography
          color={"var(--text-color)"}
          level="body-xs"
          sx={{ ml: "auto" }}
        >
          {text.length} character(s)
        </Typography>
      }
      sx={{ minWidth: 300 }}
    />
  );
};

export default ExtraNoteEvent;
