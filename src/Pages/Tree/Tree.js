// import {observable} from "mobx"
// import {observer} from "mobx-react"
import TreeChart from "../../Components/TreeChart"
import { Input, FormBtn } from "../../Components/Form";
import React, { Component, Fragment } from "react";
import API from "../../Utils/API";
import { Col } from "../../Components/Grid";
import { Chart } from "react-google-charts";
// const google = window.google;
// google.charts.load('current', { packages: ['wordtree'] });

const options = {
    wordtree: {
      format: "implicit",
      word: "the"
    }
  };


class Tree extends Component {
    state = {
        results: [],
        treeData: [],
        node: "",
        phrase: "",
        abstract: "",
        author: "",
        title: ""
    }


    APIsearch = (event) => {
        
        // this.setState({ treeData: [] })
        API.searchAPI(this.phrase)
            .then(async result => {
                console.log("RESULT: ", result);
                await this.setState({ results: result.data.results })
                console.log("hi wait")
                this.createTreeData()
            }).catch(e => console.log(e));;
    }

    createTreeData = () => {
        let bigArray = []
        for (var i=0; i<this.state.results.length; i++) {
            if (this.state.results[i].bibjson.abstract) {
            let singleArray = [this.state.results[i].bibjson.abstract];
            console.log(singleArray);
            bigArray.push(singleArray);
            }
        }
        console.log(bigArray);
        console.log(this.state.results)
        // this.state.results.map( result => {
        //     console.log(result)
        //      this.setState({ treeData: [...this.state.treeData, result.bibjson.abstract] })
            
        // })
        this.state.results.map( result => {
             this.setState({ treeData: bigArray });  
        });

        setTimeout(() => {
            console.log(this.state)
        }, 5000);


    }


    //call this on click after you have entered a phrase
    relevantAbstracts = () => this.state.results.filter(article => article.abstract.includes(this.state.phrase));


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
                            default="The"
                        // placeholder="This is the node of the tree (required)"
                        />
                        <FormBtn
                            disabled={!(this.state.phrase)}
                            onClick={this.relevantAbstracts}
                        >
                            Find Article
                            </FormBtn>
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
                <div className={"my-pretty-chart-container"}>
                    <Chart
                        chartType="WordTree"
                        data={this.state.treedata}
                        width="100%"
                        height="400px"
                        options= {this.options}
                          
                          
                        legendToggle
                    />
                </div>
                <div id="wordtree_basic" style={{ width: 100 + '%', height: 500 + "px" }}></div>
            </Fragment>
        )
    };
};

export default Tree;