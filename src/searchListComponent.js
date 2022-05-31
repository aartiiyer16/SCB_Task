import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import dummyPoster from './images/noImage.png'

//Component to display list of movies as card
const searchListComponent = (props) => {
    const posterImage = props.data.Poster
    console.log("")
    return (
        <Card sx={{
            backgroundColor: '#33394D', color: '#fff',
            '&:hover': { transform: 'scale(1.05)', transition: "500ms", boxShadow: "box-shadow: 0px 20px 56px -12px rgba(0, 0, 0, 0.75);", zIndex: 12 }
        }}>
            <CardActionArea component={Link} to={`/SCB_Task/${props.data.imdbID}`} style={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="356"
                    image={posterImage !== 'N/A' ? posterImage : dummyPoster}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.data.Title}
                    </Typography>
                    <Typography variant="body2">
                        {props.data.Year}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default searchListComponent;