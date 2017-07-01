import _ from 'lodash'
import React from "react";
import {Label, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {kernelValidation} from "./kernelValidation"

export const mountGenresTags = function(list){

    return list.map((genre, index) =>{
        return (
            <Link key={index} to={`/games/${genre.name}`} >
                <Label color='teal'>
                    {genre.name}
                </Label>
            </Link>
     )})
}

export const mountIcons = function(kernels){
    
    let listKernel = (_.uniq(kernels).sort()).map((kernel,index) => {
         return (<Icon color='grey' key={index} inverted size={kernelValidation(kernel)} className={kernel} />)                 
    })
    
    return (listKernel)
}   