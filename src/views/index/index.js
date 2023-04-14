/* eslint-disable @typescript-eslint/naming-convention */
const vscode = acquireVsCodeApi();
// Get the React and Material-UI objects from the global window object
const { React, ReactDOM, MaterialUI } = window;
const { useEffect, useState } = React;
// Destructure the components from MaterialUI
const { Box, Button, FormControlLabel, Switch, TextField, Grid, List, ListItem, ListItemText, ThemeProvider, createMuiTheme, CssBaseline } = MaterialUI;

function MessageInput({ value, onChange, onSubmit }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onSubmit(event.target.value);
      onChange('');
    }
  };

  return (
    <TextField
      label="Message"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      fullWidth
      multiline
    />
  );
}

// dark theme
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App({ messagesList }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // TODO
  }, []);

  const onSubmit = (value) => {
    vscode.postMessage({
      command: 'message',
      text: value,
    });
  };

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box p={4}>
              <MessageInput
                value={message}
                onChange={setMessage}
                onSubmit={onSubmit}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={4}>
              <ReactEmbed url="http://localhost:3006" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <List id="messagesList" dense>
              {messagesList.map((message) => (
                <ListItem key={message} onClick={() => setMessage(message)}>
                  <ListItemText>
                    {message}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

window.onload = () => {
  vscode.postMessage({
    command: 'message',
    text: 'Hello World',
  });
};
