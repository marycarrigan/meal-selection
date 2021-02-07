import React, {Component} from 'react';
import backgrnd from './images/vegetables.jpg';
import './App.css';
import {AppBar, Typography, Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel} from '@material-ui/core';
import choices from "./choices.js";
import {Card, CardColumns, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Navbar, Row, Col} from 'reactstrap';
import one from "./images/shrimp_chowder.jpg";
import two from "./images/steak_zoodles.jpg";
import three from "./images/cauliflower_fried_rice.jpg";
import four from "./images/bacon_asparagus_frittata.jpg";
import five from "./images/salmon_spinach_tomato.jpg"


export default class App extends Component {

    constructor(props){
        super(props);
         this.state = {
             dialogOpen: true,
             items: choices,
             selections : []
         }
         this.images = [one, two, three, four, five];
    }


    render() {
        return (
            <>
               <AppBar position="static" style={{ backgroundImage: `url(${backgrnd})` }}><Typography variant="h2"><b>Meals by Mary</b></Typography></AppBar>
               <Dialog open={this.state.dialogOpen} onClose={() => this.setState({dialogOpen: false})}>
                   <DialogTitle>Happy Birthday, Mom!</DialogTitle>
                   <DialogContent>Welcome to "Meals by Mary". Select the meals you would like me, your wonderful gourmet chef daughter, to prepare for you!</DialogContent>
               </Dialog>
                <Navbar color="light" light expand="md"/>
                <Row>
                    <Col sm={12} md={{size: 10, offset: 1}}>
                        <Navbar color="light" light expand="md">Selected</Navbar>
                        <CardColumns>
                            {this.state.selections.map((item, index) =>
                                <Card>
                                    <CardImg src={this.images[index]} />
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardSubtitle tag="h6"><b>Calories: </b>{item.calories}<b> Carbs: </b>{item.carbs}</CardSubtitle>
                                        <CardText>{item.description}</CardText>
                                        <FormControlLabel
                                            control={<Checkbox name={item.title}/>}
                                            label="Unselect this meal"
                                        />
                                    </CardBody>
                                </Card>
                            )}
                        </CardColumns>
                        <Navbar color="light" light expand="md">Other Choices</Navbar>
                        <CardColumns>
                            {this.state.items.map((item, index) =>
                                <Card>
                                    <CardImg src={this.images[index]} />
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardSubtitle tag="h6"><b>Calories: </b>{item.calories}<b> Carbs: </b>{item.carbs}</CardSubtitle>
                                        <CardText>{item.description}</CardText>
                                        <FormControlLabel
                                            control={<Checkbox name={item.title}/>}
                                            label="Select this meal"
                                        />
                                    </CardBody>
                                </Card>
                            )}
                        </CardColumns>
                    </Col>
                </Row>
            </>
        );
  }



}

