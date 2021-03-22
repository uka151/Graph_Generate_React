import React from "react";
import { Tooltip } from "reactstrap";

class TooltipItem extends React.Component {    
    constructor(props)
    {
        super(props);
        this.state = { tooltipOpen : false,
          secondtooltipOpen:false
         };
    this.toggle=this.toggle.bind(this);
  }
 
  toggle=()=>{
    this.setState({
      tooltipOpen:!this.state.tooltipOpen
    })

}


 
render(){
  return (
    <>
   { this.props.label!=="remove"?
  <div><span id={this.props.label}>      
    </span>
    <Tooltip
      placement="top"
      isOpen={this.state.tooltipOpen}
      target={this.props.label}
      toggle={this.toggle}
     > 
    <h6>Removed Item</h6>
    <p>Value:{this.props.data} Month:{this.props.label}</p>
    </Tooltip></div>:
    <div><span id={this.props.label}>      
    </span>
    <Tooltip
      placement="top"
      isOpen={this.state.tooltipOpen}
      target={this.props.label}
      toggle={this.toggle}
     > 
    <h6>Add to Chart</h6>
    </Tooltip></div>
}
  </>
);
}
    
};


export default TooltipItem;