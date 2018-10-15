
import { Input, FormBtn } from "../../Components/Form";
import React, { Component, Fragment } from "react";
import API from "../../Utils/API";
import { Col } from "../../Components/Grid";
import { Chart } from "react-google-charts";


let options = {
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
        relevant: ""
    }


    APIsearch = () => {

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
        for (var i = 0; i < this.state.results.length; i++) {
            if (this.state.results[i].bibjson.abstract && this.state.results[i].bibjson.abstract != ".") {
                let singleArray = [this.state.results[i].bibjson.abstract];
                console.log(singleArray);
                bigArray.push(singleArray);
            }
        }
        console.log("big"+bigArray);
        console.log(this.state.results)
        // this.state.results.map( result => {
        //     console.log(result)
        //      this.setState({ treeData: [...this.state.treeData, result.bibjson.abstract] })

        // })
        this.state.results.map(result => {
            this.setState({ treeData: bigArray });
        });

        setTimeout(() => {
            console.log(this.state)
        }, 5000);


    }


    //call this on click after you have entered a phrase
    relevantAbstracts = (event) => {
        event.preventDefault();
        const thisArticle = this.state.results.filter(article => article.data.bibjson.abstract.includes(this.state.relevant));
        console.log("relevant"+thisArticle)
    };

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

    // handleSaveBtn = event => {
    //     if () {
    //         API.saveArticle({
    //             title: this.state.title,
    //             author: this.state.author,
    //             abstract: this.state.abstract,
    //             href: 
    //         })
    //             .then(res => alert("Article archived"))
    //             .catch(err => console.log(err));
    //     }
    // };




    render() {
        return (
            <Fragment>
                <Col size="col-6">
                    {/* search bars for GS and for resultsObj search */}
                    <form>
                        <p>Use this field to set the tree's node:</p>
                        <Input
                            value={this.state.node}
                            onChange={this.handleInputChange}
                            name="node"
                            default=""
                            placeholder="NODE"
                        />
                        <p>Use this field to locate a specific article:</p>
                        <Input
                            value={this.state.relevant}
                            onChange={this.handleInputChange}
                            name="relevant"
                            default=""
                            placeholder="Find Article"
                        />
                        <FormBtn
                            disabled={!(this.state.relevant)}
                            onClick={this.relevantAbstracts}
                        >
                            Find Article
                            </FormBtn>
                        <p>Enter your search term here:</p>
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
                            Search 
                            </FormBtn>
                    </form>
                </Col>
                {/* <Col size="col-6">
                <form>
              <Input
                value={}
                onChange={}
                name="title"
                placeholder="Title"
              />
              <Input
                value={}
                onChange={}
                name="href"
                placeholder="Hyperlink"
              />
              <Input
                value={}
                onChange={}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={}
                onChange={}
                name="abstract"
                placeholder="Abstract"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
              </form>
                </Col> */}
                <div className={"my-pretty-chart-container"}>
                    <Chart
                        chartType="WordTree"
                        data={this.state.treeData}
                        width="100%"
                        height="400px"
                        options= {options ={
                            wordtree: {
                                format: "implicit",
                                word: this.state.node
                            }
                        }
                    }


                        legendToggle
                    />
                </div>

                <div id="wordtree_basic" style={{ width: 100 + '%', height: 500 + "px" }}></div>
            </Fragment>
        )
    };
};

export default Tree;