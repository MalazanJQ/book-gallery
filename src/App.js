import './App.css';
import Gallery from './components/gallery.js';
import { useState } from 'react'
import Nav from './components/nav.js';

export default function MyApp() {
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017]
  const [booksTotal, setBooksTotal] = useState({});

  const count = (year, booksTotal) => {
    setBooksTotal(prev => ({
      ...prev,
      [year]: booksTotal
    }));
  };

  return (
    <div class="nine">
      <h1 id="top">BOOK GALLERY
        <span>A picture gallery of all the books I've read since I began recording in 2017</span>
        <span>Because lists are boring and pictures are fun!</span></h1>
        <Nav years={years}/>
        <br/>
      {years.map(year => (
        <div key={year} id={year}>
          <h1>{year}<span>{booksTotal[year]} books read this year</span></h1>
          <Gallery year={year} count={count}/>
          <br/>
          <Nav years={years}/>
          <br/>
        </div>
      ))}
    </div>
  )
};
