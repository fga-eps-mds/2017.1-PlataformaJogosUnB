import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Item, Button, Header,Icon} from "semantic-ui-react";
import {getKernel} from "../../resources/getKernel"
import {kernelValidation} from "../../resources/kernelValidation"

const cardImageStyle = {
    "background": "#000000",
    "position": "relative",
    "minHeight": "200px",
    "minWidth": "200px",
};
const imageStyle = {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0,
    "margin": "auto",
    "height": "100%",
};

export default class GameItemList extends React.Component {

    getGameLink(element){
        return (
            <Link to={`/games/${this.props.game.pk}/${this.props.game.name}`}
                params={{"id": this.props.game.pk}}>
                {element}
            </Link>
        )
    }
    
    mountIcons(kernels){
        return kernels.map((kernel) => {
             return (<Icon inverted size={kernelValidation(kernel)} className={kernel} />)

        })
    }

    render () {
        return (
            <Item.Group divided unstackable>
                <Item>
                  <Item.Image size='tiny' style={cardImageStyle}>
                    {this.getGameLink(<Image src={this.props.game.card_image} style={imageStyle,cardImageStyle} />)}
                  </Item.Image>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header>
                        {this.getGameLink(<Header inverted>{this.props.game.name}</Header>)}
                    </Item.Header>
                    
                    
                    <Item.Extra>
                        {this.getGameLink(<Button basic color='green' floated='right'>Conheça mais...</Button>)}
                        
                    </Item.Extra>
                  
                    <Item.Extra>
                           <div style={{right:0, position:"absolute"}}>
                           {this.mountIcons(getKernel(this.props.game.packages))}
</div>
                    </Item.Extra>
                  </Item.Content>
                </Item>
            </Item.Group>
        );

    }
}

GameItemList.propTypes = {
    game: PropTypes.object.isRequired,
    reducePlatforms: PropTypes.func.isRequired,
}
