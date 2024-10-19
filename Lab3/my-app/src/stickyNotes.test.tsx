import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyGroceryList, dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 })

 //READ
 test("all the created notes displayed on the page", () => {
   render(<StickyNotes />);

   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteButton = screen.getByText("Create Note");
   const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {target: { value: "Note content" }});
   fireEvent.click(createNoteButton);

   const notes = screen.getAllByTestId("note-item")
   expect(notes.length).toBe(dummyNotesList.length+1);
 })

 //UPDATE
 test("update innerHTML on Update", () => {
    render(<StickyNotes />);
    const note = screen.getAllByTestId("edit");
    fireEvent.input(note[0], { target: { innerHTML: "Updated Note Title" } });
    const updatedNoteTitle = screen.getByText("Updated Note Title");
    expect(updatedNoteTitle).toBeInTheDocument();
 })

 //DELETE
 test("delete element", () => {
    render(<StickyNotes />);
    const deleteNoteButton = screen.getAllByTestId("deleteNoteButton");
    fireEvent.click(deleteNoteButton[0])

    expect(screen.queryByText("note 1 title")).not.toBeInTheDocument();
 })

 //NEW EDGE CASE: CREATE NOTE WITHOUT TITLE, BUT WITH CONTENT
 test("can i have a new note without a title but with content?", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
    const notes = screen.getAllByTestId("note-item")
    const prev = notes.length

    fireEvent.change(createNoteTitleInput, { target: { value: "" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" }});
    fireEvent.click(createNoteButton);

    expect(notes.length==prev)
 })
});
