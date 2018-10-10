import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class Tree extends Component {
    state = {
        resultsGS : [],//an array of obj with props of author, title, abstract, href
        treeData : [],//abstracts pushed from resultsGS
        node : "",
        abstract : "",
        author : "",
        title : ""
    };

  componentDidMount() {

  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(
      [this.state.treeData]
    );

    var options = {
      wordtree: {
        format: 'implicit',
        type: 'double',
        word: this.state.node
      }
    };

    var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
    chart.draw(data, options);
  }
 

  searchGS = () => {
    
  }

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
          [name] : value
      })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author && this.state.abstract) {
      API.saveArticle({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.abstract
      })
        .then(res => this.loadArchive())
        .catch(err => console.log(err));
    }
  };

  render() {
      return (
       <body>
          <div id="wordtree_basic" style="width: 900px; height: 500px;"></div>
        </body>
      )
  };
}

export default Tree;