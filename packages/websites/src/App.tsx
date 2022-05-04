import React from "react";
// @ts-ignore
import { useFetch } from "@jswork/hooks";

function App() {
  const res = useFetch("https://api.uomg.com/api/qq.info?qq=1290657123", {
    timeout: 10000,
  });

  console.log("res: ", res);

  return (
    <div className="App">
      {res.status === "loading" && <pre>loading...</pre>}
      {res.status === "success" && (
        <pre>
          <code>{JSON.stringify(res.data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

export default App;
