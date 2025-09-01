import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the ToDo interface
interface ToDo {
  id: number;
  task: string;
}

function App() {
  const [list, setList] = useState<ToDo[]>(() => {
    const stored = localStorage.getItem('todo-list');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [input, setInput] = useState<string>('');

  // Save todos to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(list));
  }, [list]);


  const addToDo = (toDo: string) => {
    if (!toDo.trim()) return;
    const newToDo: ToDo = {
      id: Math.random(),
      task: toDo,
    };
    setList((prev) => [...prev, newToDo]);
    setInput('');
  };

  const removeToDo = (id: number) => {
    setList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To Do List
        </Typography>
        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mb={2}>
          <TextField
            label="Add a task"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') addToDo(input);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToDo(input)}
            sx={{ minWidth: 100 }}
          >
            Add
          </Button>
        </Box>
        <List>
          {list.map((todo: ToDo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeToDo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ mb: 1, borderRadius: 2, bgcolor: 'background.paper' }}
            >
              <ListItemText primary={todo.task} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
