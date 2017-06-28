
import React from 'react';

export default ({triangleSize, changeSize, decreaseLevels, increaseLevels, levels, randomise, changeRandomise, twist, changeTwist, rerender, download}) => {
  return (
    <div id='controls'>
      <span className='control-item interactive'>
        <a href="http://rumblesan.com">Rumblesan</a>
      </span>

      <span className='control-item'>
        Grid: <input title='Initial grid size' value={triangleSize} onChange={(e) => changeSize(e)}/>
      </span>

      <span className='control-item'>
        Divisions:
        <button title='Increase subdivisions' onClick={decreaseLevels}>-</button>
        <span className='numeric-text'>
          {levels}
        </span>
        <button title='Decrease subdivisions' onClick={increaseLevels}>+</button>
      </span>

      <span className='control-item'>
        Rand: <input title='Randomise subdivisions' type="checkbox" value={randomise} onClick={changeRandomise}/>
      </span>

      <span className='control-item'>
        Twist: <input title='How much to twist sub division triangles' value={twist} onChange={(e) => changeTwist(e)} disabled={randomise}/>
      </span>

      <span className='control-item'>
        <button title='Rerender with new settings' onClick={rerender}>Re-Render</button>
      </span>

      <span className='control-item'>
        <button title='Right click and then save as' onClick={download}>Download</button>
      </span>

      <span className='control-item'>
        Drag and drop images
      </span>

    </div>
  );
};
