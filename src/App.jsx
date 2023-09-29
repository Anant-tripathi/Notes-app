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
      name: "somenam3",
      text: "sometex3",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem);

  return (
    <div className="container">
      <Sidebar items={items} setSelectedItem={setSelectedItem} />
      <Main items={items} setItems={setItems} />
    </div>
  );
}

function Sidebar({ items, setSelectedItem }) {
  return (
    <div className="sidebar">
      <ul>
        {items.map((item) => (
          <Notes key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Notes({ item, setSelectedItem }) {
  const selectItem = () => {
    console.log("hi");
    setSelectedItem = item.id;
  };
  return <li onClick={() => selectItem}>{item.name}</li>;
}

function Main({ items, setItems }) {
  return (
    <div className="main">
      <h1>Notes App</h1>
      <form action="submit">
        <textarea
          value={items[1].text}
          className="input"
          onChange={(e) => items[1].setText(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
