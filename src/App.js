import { useState } from "react";
import "./styles.css";
import { nanoid } from "nanoid";

export default function App() {
  const [state, setState] = useState("");
  const [word, setWord] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleget = (e) => {
    const str = e.target.value;
    setState(str);
  };

  const handleAlert = () => {
    // alert(`hello ${state}`)
    if (!edit) {
      const sentence = `hello ${state}`;
      setWord([...word, { sentence, id: nanoid() }]);
      setState("");
    } else {
      const UpdateScentence = word.map((elem) => {
        if (elem.id === editId) {
          return { ...elem, sentence: `Hello ${state}` };
        }
        return elem;
      });
      setWord(UpdateScentence);
      setEdit(false);
      setEditId(null);
    }
    setState("");
  };
  const handleDel = (idElem) => {
    const UpdateWord = word.filter((elem) => elem.id !== idElem);
    setWord(UpdateWord);
  };
  const handleEdit = (idElem) => {
    setEdit(true);
    setEditId(idElem);
    const UpdateState = word.find((elem) => elem.id === idElem);
    if (UpdateState) {
      setState(UpdateState.sentence.replace("hello", ""));
    }
  };

  return (
    <div className="App">
      <input type="text" value={state} onChange={handleget} />
      {!edit ? (
        <button onClick={handleAlert}>Add</button>
      ) : (
        <button onClick={handleAlert}>Save</button>
      )}
      {word &&
        word.map((elem, id) => {
          return (
            <ul key={elem.id} style={{ display: "flex" }}>
              <li style={{ listStyle: "none" }}>{elem.sentence}</li>
              <div style={{ paddingLeft: "1rem" }}>
                <button onClick={() => handleEdit(elem.id)}>edit</button>
                <button onClick={() => handleDel(elem.id)}>delete</button>
              </div>
            </ul>
          );
        })}
    </div>
  );
}
