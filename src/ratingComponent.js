import React from 'react';
import IMDB from './images/imdbImage.png'
import Tomatoes from './images/tomatoes.png'
import Critic from './images/critic.png'
import DefaultImage from './images/defaultImage.png'

//Component to display the ratings array
const RatingComponent = (props) => {
    const imgSoruce = {
        'Internet Movie Database': IMDB,
        'Rotten Tomatoes': Tomatoes,
        'Metacritic': Critic
    }

    return (
        <div className='flex gridGap10 divider'>
            <img style={{ height: 'fit-content' }} src={imgSoruce[props.data.Source] || DefaultImage} />
            <div className='grid spaceAround fontWeight400'>
                <p className="margin0px font18px">{props.data.Value}</p>
                <p className="margin0px font16px">{props.data.Source}</p>
            </div>
        </div>
    )
}

export default RatingComponent;
