import React from 'react'

var SearchBox = React.createClass({
    componentDidMount(){
      this.SearchBox.focus();
    },
    render() {
        return (
            <form className="ui form">
                <div className="field">
                <div className="ui icon input">
                  <input
                    ref={(input) => { this.SearchBox = input; }}
                    type="text" placeholder="Search..."></input>
                  <i className="search icon"></i>
                </div>
                </div>
            </form>
        )
    }
})

export default SearchBox
