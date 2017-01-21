
import React from 'react';

export default ({triangleSize, changeSize, decreaseLevels, increaseLevels, levels, randomise, changeRandomise, twist, changeTwist, rerender}) => {
  return (
    <div id='controls'>
      <span className='control-item interactive'>
        <a href="http://rumblesan.com">Rumblesan</a>
      </span>

      <span className='control-item'>
        Initial Size: <input value={triangleSize} onChange={(e) => changeSize(e)}/>
      </span>

      <span className='control-item'>
        <button onClick={decreaseLevels}>-</button>
        <span className='numeric-text'>
          {levels}
        </span>
        <button onClick={increaseLevels}>+</button>
      </span>

      <span className='control-item'>
        <input type="checkbox" value={randomise} onClick={changeRandomise}/>
      </span>

      <span className='control-item'>
        Twist (0 - 1): <input value={twist} onChange={(e) => changeTwist(e)}/>
      </span>
      <span className='control-item'>
        <button onClick={rerender}>Re-Render</button>
      </span>

      <span className='control-item'>
        Drag and drop an image to change
      </span>

    </div>
  );
};
