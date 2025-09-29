"use client";

import { useState } from "react";

export default function Counter({ clients }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        {count}
      </button>
      <p>There are {clients.length} clients</p>
    </div>
  );
}
