import './App.css';
import Gallery from './components/gallery.js';
import { useState } from 'react'

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
      <h1>BOOK GALLERY
        <span>All the books I've read since I began recording in 2017.
        Lists are boring and pictures are fun, so here they are!</span></h1>
      {years.map(year => (
        <div key={year}>
          <h1>{year}<span>{booksTotal[year]} books read this year</span></h1>
          <Gallery year={year} count={count}/>
        </div>
      ))}
    </div>
  )
};
