import React from 'react'
import SearchBox from './components/SearchBox'

var SuperSearch = React.createClass({
    getIntialState() {
        return ({
            search: ''
        })
    },
    render() {
        return (
            <div className="main">
                <section className="ui container">
                    <SearchBox></SearchBox>
                </section>

                <footer>

                </footer>
            </div>
        )
    }
})

export default SuperSearch
