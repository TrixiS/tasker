import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      Hello World
      <label>Count is {count}</label>
      <button onClick={() => setCount((count) => count + 1)}>Click</button>
    </div>
  );
}

export default App;
