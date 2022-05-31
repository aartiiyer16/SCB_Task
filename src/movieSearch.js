import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MenuItem, TextField, Divider } from '@mui/material'
import { Search } from '@mui/icons-material';
import apiCaller from './apiCaller'
import { debounce } from 'lodash'
import SearchListComponent from './searchListComponent';
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles';

const MovieSearch = (props) => {

    const [type, setType] = useState('')
    const [userInput, setUserInput] = useState('')
    const [pageNumber, setPageNumber] = useState(null)
    const [errorState, setErrorState] = useState(null)
    const [totalResults, setTotalResults] = useState(null)

    const searchType = ['Movie', 'Series', 'Episodes']
    const isInitialMount = useRef(true);

    //Debouncing API Calls 
    const delay = useCallback(debounce(async (movieList, input, selectedtype, page) => {
        // console.log("callback called with Sent", input,"TYPE",selectedtype,"PGNO",page,movieList)
        const params = { 's': input, 'type': selectedtype, 'page': page }
        const response = await apiCaller(params);

        if (response.Response === 'True') {
            setTotalResults(+response.totalResults)
            props.update({ movieList: movieList.concat(response.Search), userInput: input, movieType: selectedtype, pageNo: page, totalResults: +response.totalResults })
            setErrorState(null)
        } else {
            setErrorState(response.Error)
        }

    }, 500), [])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (props.userInput || userInput.length > 0) {
            delay(props.movieList, props.userInput, props.movieType, props.pageNo);
        }
    }, [type, userInput, pageNumber])

    const fetchNextList = () => {
        var lastPage = pageNumber || props.pageNo || 0
        console.log("in fetch next func called", lastPage)
        props.update({ movieList: props.movieList, userInput: props.userInput, movieType: props.movieType, pageNo: lastPage + 1 })
        setPageNumber(lastPage + 1)
    }

    //Style for MUI element
    const styleJson = {
        inputProps: {
            outline: 'none',
            color: '#fff'
        },
        inputText: {
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
            WebkitBoxShadow: "0 0 0 1000px #33394D inset",
            WebkitTextFillColor: '#fff',
            color: '#fff'

        },
        inputPropsSelect: {
            outline: 'none',
            paddingLeft: '16px',
            color: '#fff'
        }
    }

    const useStyles = makeStyles({
        icon: {
            color: '#fff !important'
        },
    });

    const classes = useStyles();

    return (
        <div className='grid gridGap10'>
            <h1 className='textAlignCenter'>Search all Movies and TV Shows here</h1>

            <div className='flex alignCenter searchBar'>
                <TextField select
                    value={type || props.movieType}
                    variant="standard"
                    onChange={(event) => {
                        setType(event.target.value)
                        if (props.movieList) {
                            props.update({ movieList: [], movieType: event.target.value, pageNo: 1, totalResults: 0 })
                            setPageNumber(1);
                            setErrorState(null);
                        }
                    }
                    } InputProps={{
                        disableUnderline: true,
                        style: styleJson.inputPropsSelect,

                    }}
                    inputProps={{
                        style: styleJson.inputText,
                        classes: { icon: classes.icon }
                    }}
                >
                    {searchType.map((options) => (
                        <MenuItem key={options} value={options} >
                            {options}
                        </MenuItem>
                    ))}
                </TextField>

                <Divider orientation="vertical" variant="middle" flexItem />
                <Search />

                <TextField
                    value={props.userInput}
                    sx={{ m: 1, width: '25ch' }}
                    variant='standard'
                    placeholder='Enter Movie/Series Name'
                    onChange={(event) => {
                        setUserInput(event.target.value)
                        if (props.movieList) {
                            props.update({ movieList: [], userInput: event.target.value, pageNo: 1, totalResults: 0 })
                            setPageNumber(1);
                            setErrorState(null);
                        }
                    }
                    }
                    InputProps={{
                        disableUnderline: true,
                        style: styleJson.inputProps
                    }}
                    inputProps={{
                        style: styleJson.inputText
                    }}
                />
            </div>

            <InfiniteScroll dataLength={props.movieList.length}
                next={fetchNextList}
                hasMore={true}
                loader={(props.movieList.length !== props.totalResults) && <h4>Loading ... </h4>}>

                <div className='grid gridAutoFitImage'>
                    {props.movieList && props.movieList.map((result) => <SearchListComponent data={result} key={result.imdbID + `${Math.random()}`} />)}
                </div>

                {errorState && <p>{(props.movieList.length === props.totalResults && props.totalResults!=0) ? "You have reached end of Search!" : errorState}</p>}
            </InfiniteScroll>

        </div>
    )

}

export default MovieSearch;