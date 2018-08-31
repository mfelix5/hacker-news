import React from 'react';

const Loading = () =>
  <div style={{marginTop: 20, color: "rgb(251, 190, 75)"}}> 
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <span className="sr-only">Loading...</span>
  </div>

export default Loading;