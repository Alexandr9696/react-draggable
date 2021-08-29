import React, {useEffect} from 'react'
import './App.css';
import {v4} from "uuid";
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable'

function App() {
  const [item, setItem] = React.useState('');
  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: v4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems([...items, newItem])
      setItem('')
    } else {
      alert('Enter something')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data, index) => {
    const newArray = [...items]
    newArray[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArray)
  }

  const keyPres = (e) => {
    const code = e.keyCode || e.which
    if (code === 13) {
      newItem()
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter something"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPres(e)}
        />
        <button className="enter" onClick={newItem}>Enter</button>
      </div>
      {
        items.map((item, index) =>
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePos(data, index)
            }}
          >
            <div className="todo__item" style={{backgroundColor: item.color}}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteNode(item.id)}>X</button>
            </div>
          </Draggable>
        )
      }
    </div>
  );
}

export default App;
