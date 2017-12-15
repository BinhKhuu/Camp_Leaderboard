import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Camper extends React.Component {
	render() {
		return (
			<tr>
				<td scope='col'>{this.props.index}</td>
				<td>{this.props.id.username}</td>
				<td>{this.props.id.score}</td>
				<td>{this.props.id.overall}</td>
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
		var obj = {username:"",score: 0, overall: 1};
		fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(response =>{
			return response.json();
		}).then(object =>{	
			let data = object.map((d) => {
				var rObj = {username:'',score: 0};
				rObj['username'] = d.username
				rObj['score'] = d.recent;
				rObj['overall'] = d.alltime;
				return rObj;
			})
			this.setState({campers:data})
		})
		
	}
  render() {
  	console.log(this.state.campers[0].username)
  	var ladder = [];
  	for(var i = 0; i< 100; i++){
  		ladder[i] = i;
  	}
    return (
    	<div className='background'>
    		<table className='table table-striped' align='right'>
    			<thead className='thead-dark'>
    				<tr>
							<th scope='col' width='15%'>Rank</th>
							<th scope='col' width='20%'>Camper</th>
							<th scope='col' width='30%'>Points in past 30 Days</th>
							<th scope='col' >Total Points</th>
						</tr>
    			</thead>
    			<tbody>
		    		{ladder.map((x,i) => {
		    			//check if http request in componetwillmount has set the state
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