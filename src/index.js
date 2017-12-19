import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Camper extends React.Component {
	render() {
		return (
			<tr>
				<td scope='col'>{this.props.index}</td>
				<td>{this.props.id.username}</td>
				<td>{this.props.id.recent}</td>
				<td>{this.props.id.alltime}</td>
			</tr>
		);
	}
}

class Ladder extends React.Component {
	constructor() {
		super();
		this.state = {
			campers: [{username:"loading",score:0,overall:0}]
		}
	}
	componentWillMount() {
		this.getPoints('https://fcctop100.herokuapp.com/api/fccusers/top/recent');			
	}
	getPoints(url) {
		fetch(url).then(response =>{
			return response.json();
		}).then(object =>{	
			this.setState({campers:object})
		})
	}
  render() {
  	var ladder = [];
  	for(var i = 0; i< 100; i++){
  		ladder[i] = i;
  	}
    return (
    	<div className='background'>
    		<table className='table table-striped' align='right'>
    			<thead className='thead-dark'>
    				<tr>
							<th scope='col' width='10%'>Rank</th>
							<th scope='col' width='25%'>Camper</th>
							<th scope='col' width='30%'><a href='#' onClick={() => this.getPoints('https://fcctop100.herokuapp.com/api/fccusers/top/recent')}>Points in past 30 Days </a></th>
							<th scope='col' ><a href='#' onClick={() => this.getPoints('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')}> Total Points</a></th>
						</tr>
    			</thead>
    			<tbody>
		    		{ladder.map((x,i) => {
		    			//check if http request in componetWillMount and getPoints has set the state
		    			if(this.state.campers[i] == undefined) i = 0;
		    			return <Camper index={i+1} id={this.state.campers[i]}/>
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