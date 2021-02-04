import React from 'react';
import {Component } from "react";
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
const style = {
    color: 'gray',
    border: '1px dashed gray',
    padding: '.5em 1em',
    cursor: 'move'
};

export function Item(props) {
    const { item, isDragging } = props;
    const opacity = isDragging ? 0 : 1;

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">{item.title}</CardTitle>
                <CardSubtitle tag="h6"><b>Calories: </b>{item.calories}<b> Carbs: </b>{item.carbs}</CardSubtitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

export function createItem(item, isDragging) {
    return <Item item={item} isDragging={isDragging}/>;
}