
import React from 'react';

export default ({triangleSize, changeSize, decreaseLevels, increaseLevels, levels, randomise, changeRandomise, twist, changeTwist, rerender}) => {
  return (
    <div id='controls'>
      <span className='control-item interactive'>
        <a href="http://rumblesan.com">Rumblesan</a>
      </span>

      <span className='control-item'>
        Grid: <input value={triangleSize} onChange={(e) => changeSize(e)}/>
      </span>

      <span className='control-item'>
        Divisions:
        <button onClick={decreaseLevels}>-</button>
        <span className='numeric-text'>
          {levels}
        </span>
        <button onClick={increaseLevels}>+</button>
      </span>

      <span className='control-item'>
        Rand: <input type="checkbox" value={randomise} onClick={changeRandomise}/>
      </span>

      <span className='control-item'>
        Twist: <input value={twist} onChange={(e) => changeTwist(e)} disabled={randomise}/>
      </span>
      <span className='control-item'>
        <button onClick={rerender}>Re-Render</button>
      </span>

      <span className='control-item'>
        Drag and drop images
      </span>

    </div>
  );
};
