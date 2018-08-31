import React from 'react';
import { sortBy } from 'lodash';
import Sort from './Sort.js';
import Button from './Button.js';
import './App.css';


const SORTS = {
    TITLE: list => sortBy(list, 'title'),
    POINTS: list => sortBy(list, 'points').reverse(),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    DATE: list => sortBy(list, 'created_at').reverse(),
  }


const Table = ({ list, onDismiss, sortKey, onSort }) => 
    <div className="table">
        <div className="table-header"> 
            <span style={{width: "48%"}}>
                <Sort 
                    sortKey={'TITLE'}
                    onSort={onSort}
                >
                title
                </Sort>
            </span>
            <span style={{width: "15%"}}>
                <Sort
                    sortKey={'AUTHOR'}
                    onSort={onSort}
                >
                author
                </Sort>
            </span>
            <span style={{width: "15%"}}>
                <Sort
                    sortKey={'DATE'}
                    onSort={onSort}
                >
                date
                </Sort>
            </span>
            <span style={{width: "10%"}}>
                <Sort
                    sortKey={'COMMENTS'}
                    onSort={onSort}
                >
                comments
                </Sort>
            </span>
            <span style={{width: "10%"}}>
                <Sort
                    sortKey={'POINTS'}
                    onSort={onSort}
                >
                points
                </Sort>
            </span>
            <span style={{width: "2%"}}>

            </span>
        </div>
      {SORTS[sortKey](list).map(x =>
        <div key ={x.objectID} className="table-row">
            <span style={{ width: '48%' }}>
              <a href={x.url} target="_blank">{x.title}</a>
            </span>
            <span style={{ width: '15%' }}>{x.author}</span>
            <span style={{ width: '15%' }}>{x.created_at.split("T")[0]}</span>
            <span style={{ width: '10%' }}>{x.num_comments}</span>
            <span style={{ width: '10%' }}>{x.points}</span>
            <span style={{ width: '2%' }}>
              <Button 
                onClick={() => onDismiss(x.objectID)}
                className="button-inline"
              >
              <i className="fa fa-window-close" aria-hidden="true"></i>
              </Button>
            </span>
        </div>
      )}
    </div>


export default Table;