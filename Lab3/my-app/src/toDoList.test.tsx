import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList, dummyNotesList } from "./constants";

describe("Create To Do List", () => {

//READ
test("Are all items in the grocery list displayed on screen?", () => {
    render(<ToDoList />);
    const list_items = screen.getAllByTestId("list_item");
    expect(list_items.length === dummyGroceryList.length);
});

//Correct updated number of items
test("Is the number of items checked the same as shown in the title?", () => {
    render(<ToDoList />);
    const checkboxes = screen.getAllByRole("checkbox", {checked:false});
    fireEvent.click(checkboxes[0], checkboxes[1]);
    
    const num_checkboxes = screen.getAllByRole("checkbox", {checked:true}).length;
    const items_text = screen.getByText("Items bought: " + num_checkboxes.toString());
    expect(items_text).toBeInTheDocument;
});

//NEW EDGE CASE: Unchecking a checkbox updates count 
test("Unchecking a checkbox updates count", () => {
    render(<ToDoList />);
    const checkboxes = screen.getAllByRole("checkbox", {checked:false});
    fireEvent.click(checkboxes[0], checkboxes[1]);  //check the boxes

    fireEvent.click(checkboxes[0], checkboxes[1])   //uncheck the boxes
    const items_text = screen.getByText("Items bought: 0");
    expect(items_text).toBeInTheDocument;
});
});