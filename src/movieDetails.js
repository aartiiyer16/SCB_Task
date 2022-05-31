import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiCaller from "./apiCaller";
import { Divider } from "@mui/material";
import Star from './images/star.png'
import { Language } from '@mui/icons-material';
import RatingComponent from "./ratingComponent";
import dummyPoster from './images/noImage.png'

const MovieDetails = () => {
    const params = useParams();
    let id = params.id;

    const [details, setDetails] = useState({})
    const [runTimeHour, setRunTimeHour] = useState('')
    const [runTimeMin, setRunTimeMin] = useState('')

    useEffect(() => {
        const apiCall = async () => {
            const response = await apiCaller({ i: id })

            setDetails(response)
            console.log("in movie details response: ", response)

            //converting run time from minutes to hr:min
            let [time, minutes] = response.Runtime.split(' ');
            setRunTimeHour(Math.floor(+time / 60))
            setRunTimeMin(time % 60);

            console.log("time: ", runTimeHour, runTimeMin)
        }
        apiCall()
    }, [])

    return (
        <div className="grid gridGap30">
            <div className="mainClass">
                <img className="posterImageWidth" src={details.Poster !== 'N/A' ? details.Poster : dummyPoster} />
                <div className="flex flexColumn gridGap30 fillAvailableWidth">
                    <div className="titleBlock">
                        <div className="grid">
                            <p className="margin0px font24px fontWeight700">{details.Title}</p>
                            <div className="flex alignCenter gridGap10 font14px fontWeight500">
                                {details.Runtime !== 'N/A' ? <p className="margin0px">{runTimeHour}hr {runTimeMin}min</p> : <p>No Runtime Available</p>}
                                <Divider style={{ background: "#525B7A", height: '80%', width: '1px' }} orientation="vertical" variant="middle" />
                                <p className="margin0px">{details.Genre}</p>
                            </div>
                            <div className="flex alignCenter gridGap10 font14px fontWeight500">
                                <p className="margin0px">{details.Year}</p>
                                <p className="margin0px">{details.Rated}</p>
                                <div className="allCenter" style={{ width: 78, height: 30, backgroundColor: '#98CEFF', borderRadius: 36, textTransform: 'capitalize' }}>
                                    {details.Type}
                                </div>
                            </div>
                        </div>
                        <div className="ratingBlock">
                            {details.BoxOffice && <p className="margin0px font14px fontWeight500"> <span className="font24px fontWeight600">{details.BoxOffice}</span> on Box Office</p>}
                            {details.imdbVotes && <p className="margin0px font14px fontWeight500"><span className="font24px fontWeight600">{details.imdbRating}</span> IMDB ({details.imdbVotes})</p>}
                            {details.Metascore && <div className="flex alignCenter gridGap10">
                                <img src={Star} />
                                <p className="margin0px font14px fontWeight500">{details.Metascore}% Metascore</p>
                            </div>}
                            {details.Website && <div className="flex alignCenter gridGap10">
                                <Language />
                                <a className="margin0px font14px fontWeight500" href={details.Website}> Website </a>
                            </div>}
                        </div>
                    </div>

                    <div className="flex flexColumn gridGap10">
                        <p className="margin0px font18px fontWeight700">Movie Details</p>
                        <p className="margin0px font14px fontWeight400">Available in {details.Language}</p>
                        <p className="margin0px font14px fontWeight400">Released in {details.Country}</p>
                    </div>

                    <div className="grid gridWithDivider alignCenter">
                        {details.Production && <div className="divider">
                            <p className="margin0px font18px fontWeight700">Production Started</p>
                            <p className="margin0px font14px fontWeight400">{details.Production}</p>
                        </div>}
                        <div className="divider">
                            <p className="margin0px font18px fontWeight700">Theatrical Release</p>
                            <p className="margin0px font14px fontWeight400">{details.Released}</p>
                        </div>
                        {details.DVD && <div>
                            <p className="margin0px font18px fontWeight700">DVD</p>
                            <p className="margin0px font14px fontWeight400">{details.DVD}</p>
                        </div>}
                    </div>

                    <div className="grid gridWithDivider alignCenter">
                        <div className="divider">
                            <p className="margin0px font18px fontWeight700">Cast</p>
                            <p className="margin0px font14px fontWeight400">{details.Actors}</p>
                        </div>
                        <div className="divider">
                            <p className="margin0px font18px fontWeight700">Director</p>
                            <p className="margin0px font14px fontWeight400">{details.Director}</p>
                        </div>
                        <div>
                            <p className="margin0px font18px fontWeight700">Writer</p>
                            <p className="margin0px font14px fontWeight500">{details.Writer}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flexColumn gridGap10">
                <p className="margin0px font18px fontWeight700">Plot</p>
                <p className="margin0px font16px fontWeight400">{details.Plot}</p>
            </div>

            <div className="flex flexColumn gridGap10">
                <p className="margin0px font18px fontWeight700">Ratings</p>
                {details.Ratings && <div className='grid gridWithImageComp'>
                    {details.Ratings.map((result) => <RatingComponent data={result} />)}
                </div>}
            </div>
        </div>
    )
}

export default MovieDetails;