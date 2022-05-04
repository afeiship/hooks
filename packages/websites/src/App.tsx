import React from "react";
// @ts-ignore
import { useFetch } from "@jswork/hooks";

function App() {
  const res = useFetch("https://api.uomg.com/api/qq.info?qq=1290657123", {
    timeout: 10,
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
      {res.status === "error" && (
        <pre>
          <code>
            name: {res.error.name} <br />
            code: {res.error.code} <br />
            message: {res.error.message} <br />
          </code>
        </pre>
      )}
    </div>
  );
}

export default App;
