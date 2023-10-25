// src/components/App.js
import React, { useState } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { Resizable } from 'react-resizable';
import Tile from './components/Tile';

import ShowcaseLayout from "./ShowcaseLayout";




const App = () => {
  // const [tiles, setTiles] = useState([
  //   { i: '1', x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2, title: 'Tile 1' },
  //   { i: '2', x: 2, y: 0, w: 2, h: 2, minW: 2, minH: 2, title: 'Tile 2' },
  //   // Add more tiles as needed
  // ]);

  // const addTile = () => {
  //   const newTile = {
  //     i: `${tiles.length + 1}`,
  //     x: 0,
  //     y: Infinity,
  //     w: 2,
  //     h: 2,
  //     minW: 2,
  //     minH: 2,
  //     title: `Tile ${tiles.length + 1}`,
  //   };
  //   setTiles([...tiles, newTile]);
  // };

  // const handleRemove = (id) => {
  //   const updatedTiles = tiles.filter((tile) => tile.i !== id);
  //   setTiles(updatedTiles);
  // };

  // return (
  //   <div className="app">
  //     <button onClick={addTile}>Add Tile</button>
  //     <ResponsiveGridLayout
  //       className="layout"
  //       layouts={{ lg: tiles }}
  //       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  //       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  //     >
  //       {tiles.map((tile) => (
  //         <div key={tile.i}>
  //           <Tile
  //             title={tile.title}
  //             onRemove={() => handleRemove(tile.i)}
  //             onMove={() => handleMove(tile.i)}
  //           />
  //         </div>
  //       )}
  //     </ResponsiveGridLayout>
  //   </div>
  // );

  <div className="App">
      <ShowcaseLayout />
    </div>

};

export default App;
