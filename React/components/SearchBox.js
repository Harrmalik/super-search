import React from 'react'
import _ from 'lodash'

var formStyle = {
    position: "absolute",
    top: "45%",
    width: "100%",
    padding: "1em",
    left: "0"
}

var SearchBox = React.createClass({
    getInitialState() {
        return {
            query: null
        }
    },
    componentDidMount() {
      this.SearchBox.focus();
    },
    searchQuery(e) {
        let component = this;
        e.preventDefault();
        component.setState({query: $(this.SearchBox).val()});
        $.ajax({
            url: `http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&
            gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext
            &exsentences=1&exlimit=max&gsrsearch=${$(this.SearchBox).val()}`,
            crossDomain : true,
            dataType: 'jsonp',
            success: function(data) {
                data = _.map(data.query.pages, function(result) {
                    return {
                        id: result.index,
                        header: result.title,
                        url: `https://en.wikipedia.org/wiki/${result.title}`,
                        summary: result.extract
                    }
                })
                component.props.callback(data);
            }
        });
    },
    render() {
        let query = this.state.query;
        return (
            <form onSubmit={this.searchQuery} style={ query ? {} : formStyle} className="ui form">
                <div className="field">
                    <div className="ui icon big input">
                      <input
                        ref={(input) => { this.SearchBox = input; }}
                        type="text" placeholder="Search for anything..."></input>
                      <i className="search icon"></i>
                    </div>
                </div>
            </form>
        )
    }
})

export default SearchBox
