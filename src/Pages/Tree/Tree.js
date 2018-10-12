import {observable} from "mobx"
import {observer} from "mobx-react"
import { Input, FormBtn } from "../../Components/Form";
import React, { Component, Fragment } from "react";
import API from "../../Utils/API";
import { Col } from "../../Components/Grid";

const google = window.google;
google.charts.load('current', {packages:['wordtree']});
    //   google.charts.setOnLoadCallback(drawChart);
    

class Tree extends Component {
    state = {
        results= {},
        treeData= [],
        node= "",
        phrase= "",
        abstract= "",
        author= "",
        title= ""
    }
    
    componentDidMount() {

    };

     drawChart = () => {
        //
        var data = google.visualization.arrayToDataTable(
            [this.state.treeData]
        );

        var options = {
            wordtree: {
                format: 'implicit',
                type: 'double',
                word: this.node
            }
        };

        var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
        chart.draw(data, options);
    };


    APIsearch = () => {
        // set state.treedata = empty []
        API.searchAPI(this.phrase)
            .then(result => {
                console.log("RESULT: ", result);
                this.setState({ results: result.data.results }, this.createTreeData())
                
            }).catch(e => console.log(e));;
        }

     createTreeData = () => {

            for (let i = 0; i < this.state.results.length; i++) {
                this.treedata.push(this.state.results[i].abstract)
                this.setState({ treeData: [...this.treeData, this.state.results[i].bibjson.abstract] })
            }
            console.log("tree ", this.treeData)
            // this.drawChart();
        };

        //call this on click after you have entered a phrase
        relevantAbstracts = () => this.state.articles.filter(article => article.abstract.includes(this.state.phrase));


        handleInputChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            });
        };

        handleAPI = event => {
            event.preventDefault();
            if (this.state.phrase) {
                this.APIsearch();
            };
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
                    <Col size="col-6">
                        {/* search bars for GS and for resultsObj search */}
                        <form>
                            <Input
                                value={this.state.node}
                                onChange={this.handleInputChange}
                                name="node"
                                placeholder="This is the node of the tree (required)"
                            />
                            <Input
                                value={this.state.phrase}
                                onChange={this.handleInputChange}
                                name="phrase"
                                placeholder="Enter your search term (required)"
                            />
                            <FormBtn
                                disabled={!(this.state.phrase)}
                                onClick={this.handleAPI}
                            >
                                Google Scholar
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="col-6">
                        {/* display the article from resultsObj search w/a save button */}
                    </Col>
                    <div id="wordtree_basic" style={{ width: 100 + '%', height: 500 + "px" }}></div>
                </Fragment>
            )
        };
    };

    export default Tree;