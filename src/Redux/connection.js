import { connect } from 'react-redux';
import { update } from './action';
import MovieSearch from '../movieSearch'

const mapStateToProps = (state) => {
    console.log("In mapstatetoprops, commonreducer, state:", state)
    return {
        movieList: state.movieList,
        userInput: state.userInput,
        movieType: state.movieType,
        pageNo: state.pageNo,
        totalResults: state.totalResults
    }
}

export default connect(mapStateToProps, { update })(MovieSearch);