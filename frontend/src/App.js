import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 16px;

  text-align: center;

  height: 100%;
  width: 100%;
`;

const TableHeader = styled.h1``;

const TableContent = styled.div`
  /* margin: 8px 0 0 0; */
`;

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      username: "Mike",
      password: "blah",
    },
    {
      id: 2,
      username: "Mike",
      password: "blah",
    },
    {
      id: 3,
      username: "Mike",
      password: "blah",
    },
  ]);

  useEffect(async () => {
    const result = await axios.get("http://localhost:8080/api/agent");
    setData(result);
  }, []);

  // fetch("/api/agent")
  //     .then(response => response.json())
  //     .then(agents => {
  //         for (const agent of agents) {
  //             let row = newBody.insertRow();
  //             row.insertCell(0).appendChild(document.createTextNode(`${agent.id}`))
  //             row.insertCell(1).appendChild(document.createTextNode(`${agent.username}`))
  //             row.insertCell(2).appendChild(document.createTextNode(`${agent.password}`))
  //         }
  //     })

  // table.replaceChild(newBody, oldBody)

  return (
    <>
      {!data.length && <div>Loading...</div>}
      {!!data.length && (
        <Table>
          <TableHeader>ID</TableHeader>
          <TableHeader>Username</TableHeader>
          <TableHeader>Password</TableHeader>
          {data.map((d) => (
            <>
              <TableContent key={d.id}>{`${d.id}`}</TableContent>
              <TableContent key={d.id}>{`${d.username}`}</TableContent>
              <TableContent key={d.id}>{`${d.password}`}</TableContent>
            </>
          ))}
        </Table>
      )}
    </>
  );
}

export default App;
