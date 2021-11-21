import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <p>This work includes data from ConceptNet 5, which was compiled by the Commonsense Computing Initiative. <br/>
      ConceptNet 5 is freely available under the Creative Commons Attribution-ShareAlike license (CC BY SA 4.0) from <a href="https://conceptnet.io">ConceptNet</a>. <br/>
      The included data was created by contributors to Commonsense Computing projects, contributors to Wikimedia projects, Games with a Purpose, Princeton University's WordNet, <br/>
      DBPedia, OpenCyc, and Umbel.</p>
    <p>This work also uses the <a href="https://opus.nlpl.eu/OpenSubtitles-v1.php">OpenSubtitle Corpus</a> which includes data from  <a href="http://www.opensubtitles.org/">OpenSubtitles</a>.</p>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
