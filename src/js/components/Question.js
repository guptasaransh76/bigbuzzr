import React from "react";

export default class Question extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 0
		};
	}


  onOpChange(index){
  	this.setState({
  		...this.state,
  		selected: index
  	});
  	this.props.onOpChange(this.props.question.id,index);
  }
  
  renderOptions(options,id){
  	const out = options.map((title, i) => { 
  	
  		return (
  			<div class = "row" style = {{"paddingLeft": "10px"}} >
  				<input key={id + "_" + i} type="radio" checked = {i == this.state.selected} name={"option" + id} onChange={()=>{this.onOpChange(i)}} >
  				<span style = {{"paddingLeft": "10px"}}>{title}</span> </input>
  			</div>
  		);
  	});
  	return out;
  }

  render() {
    const { question } = this.props;


    return (
      <div class="panel panel-default">
      	<div class="panel-heading">
      		{question.question}
      	</div>
    		<div class="panel-body">
      		{this.renderOptions(question.options,question.id)}
      	</div>
      </div>
    );
  }
}
