import _ from 'lodash'
import React from "react";
import {Label, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {kernelValidation} from "./kernelValidation"

export const mountGenresTags = function(list){

    return list.map((genre, index) =>{
        return (
            <Label key={index} color='grey'>
                <Link key={index} to={`/games/${genre.name}`} >
                    {genre.name}
                </Link>
            </Label>
     )})
}

export const mountIcons = function(kernels){
    if(kernels.length != []){
        let listKernel = (_.uniq(kernels).sort()).map((kernel,index) => {
            return (
                <Icon key={index} inverted size={kernelValidation(kernel)} className={kernel} />
            )
        })

        return (listKernel)
    } else {
        return ('...')
    }
}