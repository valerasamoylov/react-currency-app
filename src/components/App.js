import React, { Suspense } from "react";
import Main from "./views/Main/Main";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Main></Main>
      </Suspense>
    </div>
  );
}

export default App;
