
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
        relevant: "",
        relevantResult: {
            title: "",
            link: ""
        }
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
        console.log("big" + bigArray);
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
        const thisArticle = this.state.results.filter(article => article.bibjson.abstract && article.bibjson.abstract.includes(this.state.relevant));
        console.log("relevant", thisArticle)
        this.setState({
            relevantResult: {
                title: thisArticle[0].bibjson.title,
                link: thisArticle[0].bibjson.link[0].url
            }
        })
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

    handleSaveBtn = event => {
        if (this.state.relevantResult) {
            API.saveEntry({
                title: this.state.relevantResult.title,
                href: this.state.relevantResult.link
            })
                .then(res => alert("Article archived"))
                .catch(err => console.log(err));
        }
    };




    render() {
        return (
            <Fragment>
                <form className={"col-6"}>
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
                <div className={"col-6"}>
                    <p>This is your article!</p>
                    <ul>
                        <li>{this.state.relevantResult.title}</li>
                        <li>{this.state.relevantResult.link}</li>
                    </ul>
                    <button onClick={this.handleSaveBtn}>Save</button>
                </div>

                <div className={"my-pretty-chart-container"}>
                    <Chart
                        chartType="WordTree"
                        data={this.state.treeData}
                        width="100%"
                        height="400px"
                        options={options = {
                            wordtree: {
                                format: "implicit",
                                word: this.state.node
                            }
                        }
                        }
                        legendToggle
                    />
                </div>

                <div id="wordtree_basic" style={{ width: 100 + '%', height: 700 + "px" }}></div>
            </Fragment>
        )
    };
};

export default Tree;