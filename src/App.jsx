import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  /**
   *
  const [items, setItems] = useState([
    {
      id: 1,
      name: "somename",
      text: "sometext",
    },
    {
      id: 2,
      name: "somename2",
      text: "sometext2",
    },
    {
      id: 3,
      name: "somename3",
      text: "sometex3",
    },
    {
      id: 4,
      name: "",
      text: "",
    },
  ]);
   */

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems
      ? JSON.parse(storedItems)
      : [
          {
            id: 1,
            name: "",
            text: "",
          },
        ];
    //if there is no data then items is set to one array with blank name and
    //text fields
  });

  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <Sidebar
        items={items}
        setItems={setItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Main items={items} setItems={setItems} selectedItem={selectedItem} />
    </div>
  );
}

function Sidebar({ items, setItems, selectedItem, setSelectedItem }) {
  function handleAddNote() {
    const newNote = {
      id: items[selectedItem].id + 1,
      name: "",
      text: "",
    };
    setItems([...items, newNote]);
    setSelectedItem(newNote.id - 1);
  }

  return (
    <div className="sidebar">
      <ul className="list">
        {items.map((item) => (
          <Notes key={item.id} item={item} setSelectedItem={setSelectedItem} />
        ))}
      </ul>
      <button className="addNote" onClick={handleAddNote}>
        ADD
      </button>
    </div>
  );
}

function Notes({ item, setSelectedItem }) {
  const selectItem = () => {
    setSelectedItem(item.id - 1);
  };
  return (
    <li className="noteItem" onClick={selectItem}>
      {item.name}
    </li>
  );
}

function Main({ items, setItems, selectedItem }) {
  const textAreaRef = useRef(null); //declaring a useRef pointing to null

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus(); //attaching code to focus on
    //textarea when the selectedItem state updates
  }, [selectedItem]);

  const handleNoteUpdate = (e) => {
    const updatedItems = [...items];
    updatedItems[selectedItem].text = e.target.value;
    updatedItems[selectedItem].name = e.target.value.slice(0, 20);
    setItems(updatedItems);
  };

  return (
    <div className="main">
      <h1>Notes App</h1>
      <form action="submit">
        <textarea
          value={items[selectedItem].text ? items[selectedItem].text : " "}
          ref={textAreaRef} //attaching textarea to textAreaRef
          className="input"
          onChange={handleNoteUpdate}
        />
      </form>
    </div>
  );
  //TODO: adding a theme for the application
  //TODO: adding a searching feature
  //TODO: adding profiles login using google account
  //TODO: saving data to user's google drive using googleapi
  //TODO: sharing of data saved on drive
}

export default App;
