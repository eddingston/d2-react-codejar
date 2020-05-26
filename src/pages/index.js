import React, { Component } from "react";
import Layout from '@theme/Layout';
import { ReactCodeJar } from "react-codejar";
import Prism from 'prismjs';
import "prismjs/themes/prism.css";
import "prismjs/components/prism-pascaligo"

const ComponentExample = () => {
  const [code, onUpdate] = React.useState(`
type storage is int

type parameter is
  Increment of int
| Decrement of int
| Reset

type return is list (operation) * storage

// Two entrypoints
function add (const store : storage; const delta : int) : storage is 
  store + delta

function sub (const store : storage; const delta : int) : storage is 
  store - delta
  
(* Main access point that dispatches to the entrypoints according to
    the smart contract parameter. *)
function main (const action : parameter; const store : storage) : return is
  ((nil : list (operation)),    // No operations
  case action of
    Increment (n) -> add (store, n)
  | Decrement (n) -> sub (store, n)
  | Reset         -> 0
  end)`);

  const highlight = editor => {
    const text = editor.textContent;

    editor.innerHTML = Prism.highlight(
      text,
      Prism.languages.pascaligo,
      "pascaligo"
    );
  };

  return (
    <div>
      <h5>Using component:</h5>
      <ReactCodeJar code={code} onUpdate={onUpdate} highlight={highlight} />
    </div>
  );
}

function Home() {
  return (
    <Layout
      description="Description will go into a meta tag in <head />">
      <main>
      <ComponentExample/>
      </main>
    </Layout>
  );
}

export default Home;
