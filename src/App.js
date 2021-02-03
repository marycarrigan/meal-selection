import React, {Component} from 'react';
import backgrnd from './images/vegetables.jpg';
import './App.css';
import {AppBar, Typography, Dialog, DialogTitle, DialogContent, Card, Container, CardHeader, CardContent} from '@material-ui/core';


export default class App extends Component {
    constructor(props){
         super(props);
         this.state = {
             dialogOpen: true
         }
    }
  render() {
    return (
        <>
           <AppBar position="static" style={{ backgroundImage: `url(${backgrnd})` }}><Typography variant="h2"><b>Meals by Mary</b></Typography></AppBar>
           <Dialog open={this.state.dialogOpen} onClose={() => this.setState({dialogOpen: false})}>
               <DialogTitle>Happy Birthday, Mom!</DialogTitle>
               <DialogContent>Welcome to "Meals by Mary". Select the meals you would like me, your wonderful gourmet chef daughter, to prepare for you!</DialogContent>
           </Dialog>

           <Card>
                <CardHeader title={"Recipe"}/>
                <CardContent><Typography variant="body2">
                   Poop, carefully extruded on a stick.
                </Typography></CardContent>
           </Card>
        </>
    );
  }
}

