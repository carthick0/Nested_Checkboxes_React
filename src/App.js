import { useState } from "react";
import "./styles.css";

const checkboxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Apple",
        children: [
          {
            id: 3,
            name: "Green ",
          },
          {
            id: 4,
            name: "Red Apple",
          },
        ],
      },
      {
        id: 5,
        name: "Citrus",
        children: [
          {
            id: 6,
            name: "Orange",
          },
          {
            id: 7,
            name: "Lemon ",
          },
        ],
      },
      {
        id: 8,
        name: "Tropical",
        children: [
          {
            id: 9,
            name: "Mango",
          },
          {
            id: 10,
            name: "Pineapple",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Vegetables",
    children: [
      {
        id: 12,
        name: "Leafy Greens",
        children: [
          {
            id: 13,
            name: "Spinach",
          },
          {
            id: 14,
            name: "Lettuce",
          },
        ],
      },
      {
        id: 15,
        name: "Root",
        children: [
          {
            id: 16,
            name: "Carrot",
          },
          {
            id: 17,
            name: "Beetroot",
          },
        ],
      },
    ],
  },
];
const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);
      return newState;
    });
  };
  console.log(checked);
  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            style={{ accentColor: "#e91e63" }}
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />

          <span>{node.name}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <h1>Nested Checkboxes</h1>
      <Checkboxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
