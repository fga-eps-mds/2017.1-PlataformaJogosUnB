import React from "react";
import PropTypes from "prop-types";
import {Card, Image} from "semantic-ui-react";
import _ from "lodash";

const cardImageStyle = {
    "background": "#000000",
    "position": "relative",
    "minHeight": "180px",
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

export default class GameCard extends React.Component {
    reducePlatforms(packages){
        let platforms = [];
        if (packages !== undefined) {
            platforms = _.reduce(packages, (platform, bpackage) => { 
                const platform_icons = _.map(bpackage.platforms, (platform_param) => platform_param.icon);
                return platform.concat(platform_icons);
            }, []);
        }
        return _.uniq(platforms);
    }
    render () {
        return (
            <Card>
                <div style={cardImageStyle}>
                  <Image src={this.props.data.card_image} style={imageStyle} />
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.props.data.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    {this.reducePlatforms(this.props.data.packages).map((icon) => 
                        <img key={icon} src={icon} width='20' height='20' /> )
                    }
                </Card.Content>
            </Card>
        );
    }
}

GameCard.propTypes = {
    data: PropTypes.object.isRequired,
}
