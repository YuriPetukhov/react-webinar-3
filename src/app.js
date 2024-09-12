import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Универсальная функция склонения
 * @param {number} count - Количество
 * @param {array} forms - Массив форм [единственное, несколько, много]
 * @returns {string} - Правильная форма слова
 */
function getPluralForm(count, forms) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return forms[0];
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return forms[1];
  } else {
    return forms[2];
  }
}

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectionCount > 0 && (
                    <span className="Item-selectionCount">
                      {' | Выделяли ' +
                        item.selectionCount +
                        ' ' +
                        getPluralForm(item.selectionCount, ['раз', 'раза', 'раз'])}
                    </span>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
