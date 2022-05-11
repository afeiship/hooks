import React from "react";
// @ts-ignore
import { useAsync } from "@jswork/hooks";

const apiGh = () => {
  return fetch("https://api.github.com/users/afeiship").then((res) =>
    res.json()
  );
};

function App() {
  // const res = useFetch("https://api.uomg.com/api/qq.info?qq=1290657123", {
  //   timeout: 1000,
  // });

  const { data, run, pending } = useAsync(apiGh, null);

  console.log("api data: ", pending, data);

  return (
    <div className="App">
      {/*{res.status === "loading" && <pre>loading...</pre>}*/}
      {/*{res.status === "success" && (*/}
      {/*  <pre>*/}
      {/*    <code>{JSON.stringify(res.data, null, 2)}</code>*/}
      {/*  </pre>*/}
      {/*)}*/}
      {/*{res.status === "error" && (*/}
      {/*  <pre>*/}
      {/*    <code>*/}
      {/*      name: {res.error!.name} <br />*/}
      {/*      message: {res.error!.message} <br />*/}
      {/*    </code>*/}
      {/*  </pre>*/}
      {/*)}*/}

      <button onClick={run}>
        Fetch Github info - loading: {String(pending)}
      </button>
      <div id="result-gh">{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

export default App;
