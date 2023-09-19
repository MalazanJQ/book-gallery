import './App.css';
import Gallery from './components/gallery.js';
import { useState } from 'react'
import Nav from './components/nav.js';
import Filter from './components/filter.js';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CurrentlyReading from './components/currentlyReading.js'

export default function App() {
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017]
  const [booksTotal, setBooksTotal] = useState({});
  const [currTotal, setCurrTotal] = useState(0);

  const count = (year, booksTotal) => {
    setBooksTotal(prev => ({
      ...prev,
      [year]: booksTotal
    }));
  };

  const [visibleYears, setVisibleYears] = useState({ ...years.reduce((accumulator, year) => ({ ...accumulator, [year]: true }), {}), 'current': true });

  const viewYears = (year, value) => {
    setVisibleYears(prev => ({
      ...prev,
      [year]: value,
    }));
  };

  return (
    <div class="nine">
      <h1 id="top">BOOK GALLERY
        <span>A picture gallery of all the books I've read since I began recording in 2017</span>
        <span>Because lists are boring and pictures are fun!</span></h1>
        
        <div class="dropdown">
          <ButtonToolbar>
            <Nav years={years} visibleYears={visibleYears}/>
            <Filter years={years} visibleYears={visibleYears} viewYears={viewYears}/>
          </ButtonToolbar>
        </div>
        <br/>
        <div key="current" id="current">
          {visibleYears['current'] ? <CurrentlyReading id="current"/> : null}
        </div>
        <br/><br/>
        <div class="dropdown">
          <ButtonToolbar>
            <Nav years={years} visibleYears={visibleYears}/>
            <Filter years={years} visibleYears={visibleYears} viewYears={viewYears}/>
          </ButtonToolbar>
        </div>
        <br/>
      {years.map(year => (
        visibleYears[year] ? (
        <div key={year} id={year}>
          <h1>{year}<span>{booksTotal[year]} books read this year</span></h1>
          <Gallery year={year} count={count}/>
          <br/>
          <div class="dropdown">
            <ButtonToolbar>
              <Nav years={years} visibleYears={visibleYears}/>
              <Filter years={years} visibleYears={visibleYears} viewYears={viewYears}/>
            </ButtonToolbar>
          </div>
          <br/>
        </div>
        ) : null
      ))}
    </div>
  )
};
