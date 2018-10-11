

import React, { Component, Fragment } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import scholar from 'google-scholar';
import Nav from "./Components/Nav";



class Tree extends Component {
    state = {
        resultsGS: [],//an array of obj with props of author, title, abstract, href
        treeData: [],//abstracts pushed from resultsGS
        node: "",
        phrase: "",
        abstract: "",
        author: "",
        title: ""
    };

    componentDidMount() {
        
    };




    searchGS = () => {
        scholar.search(this.state.node)
            .then(resultsObj => {
                // console.log(resultsObj)
                this.setState({ resultsGS: resultsObj })
            });
        //after search, node is set, create treeData, draw the chart
        this.createTreeData(this.state.resultsGS)
        this.drawChart(this.state.treeData);
    };

    createTreeData = (object) => {
        for (const i = 0; i < object.results.length; i++) {
            this.state.treeData.push(object.results[i].abstract)
        }
    }





    drawChart = () => {
        // node will be set by when gs search, call this function there
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

    //call this on click after you have entered a phrase
    relevantAbstracts = () => this.state.articles.filter(article => article.abstract.includes(this.state.phrase));


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSaveBtn = event => {
        if (this.state.title && this.state.author && this.state.abstract) {
            API.saveArticle({
                title: this.state.title,
                author: this.state.author,
                synopsis: this.state.abstract
            })
                .then(res => alert("Article archived"))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Fragment>
                <Nav />
                {/* nav will have archive and search pages and link to my portfolio */}
                <Col size="col-6">
                    {/* search bars for GS and for resultsObj search */}
                </Col>
                <Col size="col-6">
                    {/* display the article from resultsObj search w/a save button */}
                </Col>
                <div class="col-12" id="wordtree_basic" style="width: 100%; height: 500px;"></div>
            </Fragment>
        )
    };
}

export default Tree;