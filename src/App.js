import React, {Component} from 'react';
import backgrnd from './images/vegetables.jpg';
import './App.css';
import {AppBar, Typography, Dialog, DialogTitle, DialogContent, Checkbox, Button} from '@material-ui/core';
import choices from "./choices.js";
import {Card, CardColumns, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Navbar, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import one from "./images/shrimp_chowder.jpg";
import two from "./images/steak_zoodles.jpg";
import three from "./images/cauliflower_fried_rice.jpg";
import four from "./images/bacon_asparagus_frittata.jpg";
import five from "./images/salmon_spinach_tomato.jpg"

import * as emailjs from 'emailjs-com'


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
        this.getSelectedForEmail = this.getSelectedForEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        emailjs.init("user_ioTv4yrmRUSXiRH6HI0zV");
    }

    render() {
        return (
            <>
               <AppBar position="static" style={{ backgroundImage: `url(${backgrnd})` }}><Typography variant="h2"><b>Meals by Mary</b></Typography></AppBar>
               <Dialog open={this.state.dialogOpen} onClose={() => this.setState({dialogOpen: false})}>
                   <DialogTitle>Happy Birthday, Mom!</DialogTitle>
                   <DialogContent>Welcome to "Meals by Mary". Select the meals you would like me, your wonderful gourmet chef daughter, to prepare for you! More recipes will be added soon!</DialogContent>
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
                        {this.renderSubmitChoicesButton()}
                    </Col>
                </Row>
                <Navbar color="light" light expand="md"><h2>Choices</h2></Navbar>
                <Row>
                    <Col sm={12} md={{size: 10, offset: 1}}>
                        <div style={{margin: "10px"}}>{this.renderHateThisButton()}</div>
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

  renderSubmitChoicesButton(){
        if(this.numSelected !== 0){
            return(
                <div style={{margin: "10px"}}><Button variant="outlined" color="primary" onClick={() => this.handleSubmit()}>Submit Choices</Button></div>
            )
        }
  }

    handleSubmit () {
        const message = this.getSelectedForEmail();
        if(message !== ""){
            const template_params = {
                chosen_meals: `${message}`,
                from_name: "Meal Selection Site",
                reply_to: "marykcarrigan@gmail.com"
            };
            this.sendFeedback('template_9k48ken', template_params)
        }
        alert("Mary has been notified of your selections!");
    }

    sendFeedback (templateId, variables) {
        emailjs.send(
            'service_6jn98un', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

  toggleSelected(index){
        if(this.selected[index]){
            this.selected[index] = false;
            this.numSelected--;
        }
        else{
            if(this.numSelected === 3){
                alert("Please only select 3 meals.");
                return;
            }
            this.selected[index] = true;
            this.numSelected++;
        }
        this.forceUpdate();
  }

  getSelectedForEmail(){
        let selectedString = "";
        for(let i = 0; i < this.selected.length; i++){
            if(this.selected[i]){
                selectedString += this.state.items[i].title + '\n';
            }
        }
        return selectedString;
  }

    renderHateThisButton() {
        return (
            <Button variant="outlined" color="primary" onClick={() => this.handleHateSubmit()}>Please find more recipes!</Button>
        );
    }

    handleHateSubmit(){
        const template_params = {
                chosen_meals: `Find more recipes!`,
                from_name: "Meal Selection Site",
                reply_to: "marykcarrigan@gmail.com"
        };
        this.sendFeedback('template_9k48ken', template_params)
        alert("Mary has been notified she needs to find more recipes!");
    }
}

