import React from "react";
import Axios from "axios";
import { FcSpeaker } from "react-icons/fc";
import { useState } from "react";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState("");

  // Function to fetch information of searched word on button click, and set the data accordingly
  function wordMeanings() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    }); // npx browserslist@latest --update-db
  }

  //for pronunciation of  word
  function AudioPlay() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="App">
      <div className="header">My Dictionary</div>
      <h2 style={{ padding: "6px" }}>Search Word</h2>
      <h3>{searchWord}</h3>

      <div className="search">
        <input
          onChange={(e) => setSearchWord(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button
          onClick={() => {
            wordMeanings();
          }}
        >
          Search
        </button>
      </div>

      <div className="resultbox">
        {searchWord === "" ? (
          <span className="BoxTitle">start typing in search ......</span>
        ) : (
          data && (
            <div className="showResults">
              <div className="audioplay">
                <h2>
                  {data.word}{" "}
                  <button
                    onClick={() => {
                      AudioPlay();
                    }}
                  >
                    <FcSpeaker size="15px" />
                  </button>
                </h2>
                <p>{data.meanings[0].partOfSpeech}</p>
              </div>
                <div class="more-result">
                {data.meanings[0].definitions[0].definition}
                <hr />
                <b>Example :</b>
                {data.meanings[0].definitions[0].example}
                <hr />
                <b>Synonyms :</b>
                {data.meanings[0].definitions[0].synonyms}
                </div>
              </div>
          )
        )}
      </div>
    </div>
  );
}

//npm install --save gh-pages
export default App;
