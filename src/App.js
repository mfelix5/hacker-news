import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table.js';
import Navbar from './Navbar.js';
import Button from './Button.js';
import Loading from './Loading.js';
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
      isLoading: false,
      sortKey: 'DATE',
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this)
  }
  
  onSort(sortKey) {
    this.setState({ sortKey })
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    
    this.setState({ 
      result: { hits: updatedHits, page },
      isLoading: false,
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({
      isLoading: true
    });
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
    const { searchTerm, result, isLoading, sortKey } = this.state;
    const page = (result && result.page) || 0;    
    return (
      <div className="page">
        <div className="interactions">
          <Navbar
            value={searchTerm}
            onChange={this.handleSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            search:
          </Navbar>
        </div>
        { result  
         && <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
            sortKey={sortKey}
            onSort={this.onSort}
          />  
        }
        <div className="interactions">
          { isLoading
            ? <Loading />
            : <Button 
              onClick={() => this.fetchSearchTopStories(searchTerm, page +1)}>
              show more
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default App;
