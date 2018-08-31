import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const DEFAULT_QUERY = 'react'
const DEFAULT_HPP = '100'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }
  
  setSearchTopStories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    
    this.setState({ 
      result: { hits: updatedHits, page } 
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    // console.log(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this.setSearchTopStories(result.data))
    .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = x => x.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value,
    })
  }
  
  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;    
    return (
      <div className="page">
        <div className="interactions">
          <Navbar
            value={searchTerm}
            onChange={this.handleSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search:
          </Navbar>
        </div>
        { result  
         && <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />  
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page +1)}>
            More
            </Button>
        </div>
      </div>
    );
  }
}

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

const Button = ({ onClick, className, children }) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  > {children}
  </button>

const Navbar = ({ value, onChange, onSubmit, children }) =>
    <div className="nav">
      <h1>Hacker News</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    </div>

export default App;
