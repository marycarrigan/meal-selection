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
         this.handleSelect = this.handleSelect.bind(this);
         this.handleUnselect = this.handleUnselect.bind(this);
         this.renderSelections = this.renderSelections.bind(this);
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
                        {this.renderSelections}
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
                                            control={<Checkbox name={item.title} onChange={(event) => this.handleSelect(item)}/>}
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

  renderSelections(){
            return (
                <CardColumns>
                    {this.state.selections.map((item, index) =>
                        <Card>
                            <CardImg src={this.images[index]} />
                            <CardBody>
                                <CardTitle tag="h5">{item.title}</CardTitle>
                                <CardSubtitle tag="h6"><b>Calories: </b>{item.calories}<b> Carbs: </b>{item.carbs}</CardSubtitle>
                                <CardText>{item.description}</CardText>
                                <FormControlLabel
                                    control={<Checkbox name={item.title} onChange={(event) => this.handleUnselect(item)}/>}
                                    label="Unselect this meal"
                                />
                            </CardBody>
                        </Card>
                    )}
                </CardColumns>
            )
  }

  handleSelect(obj){
        this.setState({selections: this.state.selections.push(obj)});
        let i = this.findRecipe(obj, this.state.items);
        this.setState({items: this.state.items.splice(i,1)});
        this.forceUpdate()
  }

  handleUnselect(obj){
      this.setState({items: this.state.items.push(obj)});
      let i = this.findRecipe(obj, this.state.selections);
      this.setState({items: this.state.selections.splice(i,1)});
  }

  findRecipe(obj, array){
        for(let i = 0; i < array.length; i++){
            if(obj === array[i])
                return i;
        }
        return -1;
  }
}

