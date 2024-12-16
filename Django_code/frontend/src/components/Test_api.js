import React,{ Component } from 'react';

console.log('hello')
let speciesUrl = 'http://127.0.0.1:8000/api/species/'

class FetchSpecies extends Component{
    constructor(props) {
        super(props)
    };

    this.state = {
        species : ''
    };
    
    componentDidMount() {
        fetch(speciesUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })};
}
