import { useState } from "react";
import "./App.css";

function App() {
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

  const [selectedItem, setSelectedItem] = useState(3);

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
          value={items[selectedItem].text}
          className="input"
          onChange={handleNoteUpdate}
        />
      </form>
    </div>
  );
}

export default App;
