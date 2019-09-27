import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Board/>, root);
}

function Square(props) {
    let tile;
    if (props.hidden){
      tile = null;
    }else {
      tile = props.letter;
    } 
    return (
      <button 
        className="square"
        onClick={() => props.onClick()}
      >
        {tile}
      </button>
    );
  }


class Board extends React.Component{
  constructor(props) {
    super(props);
    //Generaye a random list
    let letters_lst = this.initiateLst();
    //setup initial state
    this.state = {
	    first:  null,
	    letters: letters_lst,
	    present: [null, null, null, null, null, null, null, null, null, null, 
		    null, null, null, null, null, null], 
	    clicks: 0, 
	    click_disabled: false

    };
  }
 
  //initiate letter list.
  initiateLst(){
    let letter_lst = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
	    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let new_lst = [];
	while(letter_lst.length> 0){
          let letter = _.sample(letter_lst);
          new_lst.push(letter);
	  letter_lst.splice(letter_lst.indexOf(letter), 1);
	}
	return new_lst;
  }
  
  // restart game.
  restart(){
	  let new_lst = this.initiateLst();
	  let new_present = this.state.present.map(()=>{return null;});
	  this.setState({first: null, clicks: 0, clickDisabled: false, 
		        letters: new_lst, present:new_present});

  return ;
  }

  handleClick(i){
	  //click situation
	  if (!this.state.click_disabled){
	    let present_temp = this.state.present.slice();
	    //fist tile of a pair
	    if (this.state.first == null){
	 	 present_temp[i]=this.state.letters[i];
	  	this.setState({present: present_temp, clicks: this.state.clicks + 1, first: i});
	    }
            //second tile of pair and matched
	    else if (this.state.letters[i]==this.state.letters[this.state.first]){
	  	present_temp[i] = this.state.letters[i];
		  this.setState({present: present_temp, clicks: this.state.clicks + 1, first: null});
	    }
	    //did not matched
	    else {                                                                                      
		  present_temp[i]=this.state.letters[i];
		  this.setState({present: present_temp, clicks: this.state.clicks + 1,click_disabled: true});
		  setTimeout(()=>{
		      present_temp[this.state.first]=null;
		      present_temp[i]=null;
		      this.setState({present:present_temp,first: null, click_disabled: false});
		  }, 1000);
	    }
          } 
  }
  
  renderSquare(i) {
    if (this.state.present[i]==null){
    	return <Square 
            value={i} letter={this.state.letters[i]} hidden={true} 
            onClick={()=>this.handleClick(i)}
               />;
    }else {
	return <Square 
            value={i} letter={this.state.letters[i]} hidden={false} 
            onClick={()=>{return;}}
               />;
    }
  }

  render(){
    let clicks_num = this.state.clicks;
	return (
	<div class="main">
	  <p>clicks: {clicks_num}</p>
	  <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
	    {this.renderSquare(11)}
	  </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
          <div>
            <button className="restart" 
		onClick = {()=>this.restart()}>
		Restart
	    </button>
          </div>
       </div>
    );
	}


}

