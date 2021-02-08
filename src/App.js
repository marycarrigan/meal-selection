import React, {Component} from 'react';
import backgrnd from './images/vegetables.jpg';
import './App.css';
import {AppBar, Typography, Dialog, DialogTitle, DialogContent, Checkbox} from '@material-ui/core';
import choices from "./choices.js";
import {Card, CardColumns, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Navbar, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import one from "./images/shrimp_chowder.jpg";
import two from "./images/steak_zoodles.jpg";
import three from "./images/cauliflower_fried_rice.jpg";
import four from "./images/bacon_asparagus_frittata.jpg";
import five from "./images/salmon_spinach_tomato.jpg"


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true,
            items: choices,
        }
        this.selected = [false, false, false, false, false];
        this.images = [one, two, three, four, five];
        this.toggleSelected = this.toggleSelected.bind(this);
        this.numSelected = 0;
    }

    render() {
        return (
            <>
               <AppBar position="static" style={{ backgroundImage: `url(${backgrnd})` }}><Typography variant="h2"><b>Meals by Mary</b></Typography></AppBar>
               <Dialog open={this.state.dialogOpen} onClose={() => this.setState({dialogOpen: false})}>
                   <DialogTitle>Happy Birthday, Mom!</DialogTitle>
                   <DialogContent>Welcome to "Meals by Mary". Select the meals you would like me, your wonderful gourmet chef daughter, to prepare for you!</DialogContent>
               </Dialog>
                <Navbar color="light" light expand="md"><h2>Selected</h2></Navbar>
                <Row>
                    <Col sm={12} md={{size: 10, offset: 1}}>
                        {this.state.items.map((item, index) => {
                                    if(this.selected[index]){
                                        return(
                                            <ListGroup>
                                                <ListGroupItem>{item.title}</ListGroupItem>
                                            </ListGroup>)}})}
                    </Col>
                </Row>
                <Navbar color="light" light expand="md"><h2>Choices</h2></Navbar>
                <Row>
                    <Col sm={12} md={{size: 10, offset: 1}}>
                        <CardColumns>
                            {this.state.items.map((item, index) => {
                                    return(
                                        <Card>
                                            <CardImg src={this.images[index]} />
                                            <CardBody>
                                                <CardTitle tag="h5">{item.title}</CardTitle>
                                                <CardSubtitle tag="h6"><b>Calories: </b>{item.calories}<b> Carbs: </b>{item.carbs}</CardSubtitle>
                                                <CardText>{item.description} </CardText>
                                            </CardBody>
                                            <Checkbox checked={this.selected[index]} onChange={() => this.toggleSelected(index)}/>
                                        </Card>
                                    )}
                            )}
                        </CardColumns>
                    </Col>
                </Row>
            </>
        );
  }

  toggleSelected(index){
        if(this.numSelected == 3){
            alert("Please only select 3 meals.");
            return;
        }
        this.selected[index] = !this.selected[index];
        this.numSelected++;
        this.forceUpdate();
  }

}

