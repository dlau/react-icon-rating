/** @jsx React.DOM */
var React = require('react');

var Icon = React.createClass({
  render : function(){
    var iStyle = {
      cursor : 'pointer'
    };
    var className =
      (this.props.className ? this.props.className + ' ' : '') + 
      (this.props.toggled ? this.props.toggledClassName : this.props.untoggledClassName)
    ;
    return (
      <i className={className} onMouseEnter={this.props.onMouseEnter} style={iStyle} onClick={this.props.onClickRating}/>
    );
  }
});

var IconRating = React.createClass({
  getInitialState : function(){
    return {
      currentRating : this.props.currentRating || 0,
      max : this.props.max || 5,
      currentRating_hover : 0,
      hovering : false
    };
  },
  onMouseEnter : function(currentRating, e, id){
    this.setState({
      currentRating_hover : currentRating,
      hovering : true
    });
  },
  onMouseLeave : function(currentRating, e, id){
    this.setState({
      hovering : false
    });
  },
  onClickRating : function(currentRating, e, id){
    this.setState({
      currentRating : currentRating
    });
    if(this.props.onChange){
      this.props.onChange(currentRating);
    }
  },
  render: function() {
    var currentRating = [];
    var toggled = false;
    for(var i=1;i<=this.state.max;++i){
      toggled = i <= this.state['currentRating' + (this.state.hovering ? '_hover':'')] ? true : false;
      currentRating.push(
          <Icon key={i} toggledClassName={this.props.toggledClassName} untoggledClassName={this.props.untoggledClassName} onMouseEnter={this.onMouseEnter.bind(this,i)} onClickRating={this.onClickRating.bind(this,i)} toggled={toggled} />
      );
    }
    return (
      <div onMouseLeave={this.onMouseLeave}>
        {currentRating}
      </div>
    );
  }
});

module.exports = IconRating;
