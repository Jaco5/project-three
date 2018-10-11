import React, { Component } from "react";
import DeleteBtn from "../../Components/DeleteBtn";
import Jumbotron from "../../Components/Jumbotron";
import API from "../../Utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../Components/Grid";
import { List, ListItem } from "../../Components/List";
//import Nav from "./Components/Nav";

class Archive extends Component {
    state = {
        archive : [],
        
    };

componentDidMount() {
    this.loadArchive();
};

loadArchive = () => {
    API.getArticles()
    .then(res=> this.setState({ archive : res.data }))
    .catch(e=> console.log(e))
}

deleteEntry = id => {
    API.deleteEntry(id)
    .then(res=> this.loadArchive())
    .catch(e=> console.log(e));
}

render() {
    return (
        <Container fluid>
          <Row>
            <Col size="md-6">
              
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron>
                <h1>Archived article references</h1>
              </Jumbotron>
              {this.state.entry.length ? (
                <List>
                  {this.state.archive.map(entry => (
                    <ListItem key={entry._id}>
                      <Link to={"/archive/" + entry._id}>
                        <strong>
                          {entry.title} by {entry.author}
                        </strong>
                        <p>{entry.abstract}</p>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteEntry(entry._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
    );
}

}//end Archive

export default Archive;