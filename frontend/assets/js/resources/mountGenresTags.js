import React from "react";
import {Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


export const  mountGenresTags = function(list){

    return list.map((genre, index) =>{
        return (
            <Link key={index} to={`/games/${genre.name}`} >
                <Label color='teal'>
                    {genre.name}
                </Label>
            </Link>
     )})
}
