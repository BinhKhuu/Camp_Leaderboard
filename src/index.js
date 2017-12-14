import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var https = require('https');

class Camper extends React.Component {
	render() {
		return (
			<tr>
				<th scope='col'>{this.props.index}</th>
				<td>Camper</td>
				<td>Camper</td>
				<td>Camper</td>
			</tr>
		);
	}
}

class Ladder extends React.Component {

  render() {
  	var ladder = [];
  	for(var i = 0; i< 100; i++){
  		ladder[i] = i;
  	}
    return (
    	<div class='background'>
    		<table class='table table-striped' align='right'>
    			<thead class='thead-dark'>
    				<tr>
							<th scope='col' width='15%'>Rank</th>
							<th scope='col' width='20%'>Camper</th>
							<th scope='col' width='30%'>Points in past 30 Days</th>
							<th scope='col' >Total Points</th>
						</tr>
    			</thead>
    			<tbody>
		    		{ladder.map((x,i) => {
		    			return <Camper index={i+1}/>
		    		})}    				
    			</tbody>
    		</table>

    	</div>
    );
  }
}

ReactDOM.render(
  <Ladder />,
    document.getElementById('root')
);