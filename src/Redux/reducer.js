const initialState = {
    movieList: [],
    userInput: '',
    pageNo: 0,
    movieType: "Movie"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'update':
            console.log("in reducer, case movieListData");
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default reducer;