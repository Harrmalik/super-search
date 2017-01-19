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
            query: null,
            engine: 'google'
        }
    },
    componentDidMount() {
      this.SearchBox.focus()
    },
    googleSearch(query) {
        console.log('google')
    },
    wikipediaSearch(query) {
        let component = this

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

                component.props.callback(data)
            }
        });
    },
    searchQuery(e) {
        let component = this
        e.preventDefault()
        component.setState({query: $(this.SearchBox).val()})
        switch (component.state.engine) {
            case 'google':
                component.googleSearch(component.state.query)
                break
            case 'wikipedia':
                component.wikipediaSearch(component.state.query)
                break
        }
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

                        <SearchEngine
                            parent={this}></SearchEngine>
                    </div>
                </div>
            </form>
        )
    }
})

var SearchEngine = React.createClass({
    getInitialState() {
        return {
            engine: this.props.parent.state.engine
        }
    },
    componentDidMount() {
        $('.selection.dropdown')
          .dropdown()
        ;
    },
    changeSearchEngine(e) {
        this.props.parent.setState({
            engine: $(e.target).text().toLowerCase()
        })
    },
    render() {
        return (
            <div className="ui selection dropdown">
                <input type="hidden" name={this.state.engine}></input>
                <i className="dropdown icon"></i>
                <div className="default text">{this.state.engine}</div>

                <div className="menu">
                    <div className="item" data-value="1" onClick={this.changeSearchEngine}>Google</div>
                    <div className="item" data-value="0" onClick={this.changeSearchEngine}>Wikipedia</div>
                </div>
            </div>
        )
    }
})

export default SearchBox
