import { Button, Card, createTheme, TextField, ThemeProvider } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Container } from "@mui/system";
import React, { useState } from "react";
import './App.css';


const App = () => {

  const theme = createTheme({

    palette: {

      mode: 'dark',

    }

  });

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const noTodos = 'No todos! Add a todo by using the form above';

  const [placeHolder, setPlaceHolder] = useState('Add task');

  const HandelSubmit = (e) => {

    e.preventDefault();

    if (todo !== '' && todos.length < 4) {

      setError(false);
      setTodos([{ id: `${todo}`, todo }, ...todos])
      setTodo('')
      setPlaceHolder('Add another task?')

      console.log(todos.length)

    }else if(todo !== '' && todos.length > 3) {

     setError(true)
     setTodo('')
     setPlaceHolder('You cant add more then 5 todos')

    } else if(todo === '') {

      setError(true);
      setPlaceHolder('You cant enter a blank todo')

    }

  }



  const HandelDelete = (item) => {

     const filterTodo = todos.filter(todo=>todo.id!==item)
     setTodos(filterTodo)
     setError(false)
     setPlaceHolder('Add another task?')

  }

  return (
    <div className="App">

      <Container  maxWidth="sm" sx={{ height: '628px'}}>

        <h1>A Simple ToDo List App</h1>

        <ThemeProvider theme={theme}>

          <form onSubmit={HandelSubmit}>

            <TextField 
            
            autoComplete='off' 
            id="add-task" 
            value={todo} 
            label={placeHolder} 
            variant="outlined" 
            error={error} 
            onChange={e => { setTodo(e.target.value) }} 
            
            />

            <Button type="submit" sx={{ ml: 2 }} variant="contained" color="success"><AddIcon /></Button>

          </form>

          <p className="noTodo-message">{todos.length ? null : noTodos}</p>

          <ul>

            {

              todos.map(t => {

                return (

                  <li key={t.id} className="slide">

                    <Card sx={{ padding: 2 }}>

                      <p>{t.todo}</p>

                      <Button sx={{ ml: 2 }} size="small" variant="contained"><ModeEditOutlineOutlinedIcon sx={{ color: '#ffff' }} /></Button>
                      <Button sx={{ ml: 2 }} size="small" variant="contained" color="error" onClick={() => HandelDelete(t.todo)}><DeleteOutlineIcon /></Button>

                    </Card>

                  </li>
                
                )

              })

            }

          </ul>

        </ThemeProvider>

      </Container>

    </div>
  );
}

export default App;
