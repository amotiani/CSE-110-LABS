import { dummyNotesList } from "./constants";
import './App.css';
import React, { SetStateAction, useContext, useState } from 'react';
import { Label } from "./types";
import { ThemeContext, themes } from "./themeContext";
import { ClickCounter } from "./hooksExercise";

interface Note {
    id: number;
    title: string;
    content: string;
    label: Label;
    favorite: string;
}


export const StickyNotes = () => {
    // your code from App.tsx
    
    //THEME:
    const [currentTheme, setCurrentTheme] = useState(themes.light);
    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };  
  
  //usestate initialization of: 1) exampleNotesList array using dummy notes list, 2) favoritesList array which contains "id"s of only fav notes
  const [favoritesList, setFavoritesList] = useState<number[]>([]); 
  
  //make a function that handles adding/removing elements of fav list, check if favlist includes that element, you remove it else add it. 
  //and pass a Note element as parameter.
  // then pass this function to the FavoritesFlag() function and invoke it whenever our favorites button is clicked.
  const checkFav = (note:Note) => {
    if(favoritesList.includes(note.id)){
      //remove
      setFavoritesList(favoritesList.filter(item => item!=note.id));
    }
    else{
      setFavoritesList([...favoritesList, note.id]);
    }
  };

  //initialize notes, setnotes with dummynoteslist
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: 7,
    title: "",
    content: "",
    label: Label.other,
    favorite: "♡"
  };

  //initialize createNote and setCreateNote with initialNote, an example note value 
  const [createNote, setCreateNote] = useState(initialNote);

  //Create a new sticky note and display it (runs when submit button is clicked)
  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()  //prevents reloading
    
    createNote.id++;
    //update notes list's value with new note added
    setNotes([...notes, createNote]);
    //change new note's id
  }

  //EDIT:
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const editNoteHandler = () => {
    //update note's field which was edited
    
  }

  //DELETE NOTE:
  const deleteNote = (noteToDelete: Note) => {
    if(notes.includes(noteToDelete)){
    setNotes(notes.filter(item => item!=noteToDelete))
    }
  }

 return (
  <ThemeContext.Provider value={currentTheme}>

  <div className='app-container'>
  <form className="note-form" onSubmit={createNoteHandler}>
    <div>
      <input
        placeholder="Note Title"
        onChange={(event) =>
          setCreateNote({ ...createNote, title: event.target.value })}
        required>
      </input>
    </div>

    <div>
      <textarea
        placeholder="Note Content"
        onChange={(event) =>
          setCreateNote({ ...createNote, content: event.target.value })}
        required>
      </textarea>
    </div>

    <div>
     <select
       onChange={(event) =>
         setCreateNote({ ...createNote, label: event.target.value as Label})}
       required>
       <option value={Label.personal}>Personal</option>
       <option value={Label.study}>Study</option>
       <option value={Label.work}>Work</option>
       <option value={Label.other}>Other</option>
     </select>
   </div>

    <div><button type="submit">Create Note</button></div>
  </form>
  
    <div style={{
       background: currentTheme.background,
       color: currentTheme.foreground,
       padding: "20px",
     }} className="notes-grid">
       {notes.map((note) => (
         <div style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
           key={note.id}
           className="note-item"
           data-testid="note-item"
           >
           <div className="notes-header">
           <FavoritesFlag favState = {note.favorite} toggleFavoriteChange={checkFav} selectedNote = {note} />
           <button data-testid="deleteNoteButton" onClick={()=>deleteNote(note)} style={{
              background: currentTheme.background,
              color: currentTheme.foreground,
            }}>x</button>
          </div>
            <h2 contentEditable="true" data-testid="edit" onInput={editNoteHandler}> {note.title} </h2>
            <p contentEditable="true"> {note.content} </p>
            <p contentEditable="true"> {note.label} </p>
          </div>
       ))}
     </div>
    <button onClick={toggleTheme}> Toggle Theme </button>
    <ClickCounter />
    <div>
      List of Favorites:
      {/*
        HERE, FILTER OUT ELEMENTS FROM NOTES LIST, TO CHECK IF THEY ALSO EXIST IN FAV NOTES LIST. IF SO, DISPLAY THE ELEMENTS OF
        NOTES LIST WHOSE ID IS IN FAVNOTES LIST
      */}
      <ul>
          {notes.filter(note => favoritesList.includes(note.id))
            .map((note) => (
              <li key={note.id}>{note.title}</li>
            ))
          }
      </ul>
     </div>
   </div>
   </ThemeContext.Provider>
 );
}

interface FavFlagsInterface {
    favState: string;
    selectedNote: Note;
    toggleFavoriteChange: (note: Note) => void;
  }
  
  //Fav List Update Function updates the List of favs dynamically
  function FavoritesFlag({ favState, selectedNote, toggleFavoriteChange }: FavFlagsInterface) {
    const [like, setLike] = useState(favState);
  
    const toggleLike = () => {
      setLike(like === '♡' ? '❤️' : '♡');
      toggleFavoriteChange(selectedNote);
    };
    
    return (
      <div>
      <button onClick={toggleLike}>
          {like}
        </button>
     </div>
    );
  }