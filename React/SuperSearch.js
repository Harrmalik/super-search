import React from 'react'
import SearchBox from './components/SearchBox'
import Results from './components/Results'

var SuperSearch = React.createClass({
    getInitialState() {
        return ({
            search: '',
            data: []
        })
    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    render() {
        return (
            <div className="main">
                <section className="ui container">
                    <SearchBox
                        callback={this.updateResults}></SearchBox>
                    <Results
                        data={this.state.data ? this.state.data : null}></Results>
                </section>

                <footer>

                </footer>
            </div>
        )
    }
})

export default SuperSearch
