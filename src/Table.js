import React from 'react';
import './App.css';
import Button from './Button.js';

const Table = ({ list, onDismiss }) => 
    <div className="table">
      {list.map(x =>
        <div key ={x.objectID} className="table-row">
            <span style={{ width: '50%' }}>
              <a href={x.url} target="_blank">{x.title}</a>
            </span>
            <span style={{ width: '10%' }}>{x.author}</span>
            <span style={{ width: '10%' }}>{x.created_at.split("T")[0]}</span>
            <span style={{ width: '10%' }}>{x.num_comments}</span>
            <span style={{ width: '10%' }}>{x.points}</span>
            <span style={{ width: '10%' }}>
              <Button 
                onClick={() => onDismiss(x.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
        </div>
      )}
    </div>

export default Table;