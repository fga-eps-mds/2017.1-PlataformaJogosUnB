import _ from 'lodash'
import React from "react";
import PropTypes from 'prop-types';
import {Card, Button, Grid, Icon, Message, Modal} from "semantic-ui-react";
import ModalPackageCard from "./ModalPackageCard"

export default class PackageCard extends React.Component {

    reduceKernelPlatforms(packages) {
        let platforms = [];
        if (packages !== undefined) {
            platforms = _.reduce(packages, (platform, bpackage) => {
                const platform_kernel = _.map(bpackage.platforms, (platform_param) => platform_param.kernel);
                return platform.concat(platform_kernel);
            }, []);
        }
        return (_.uniq(platforms));
    }

    getIcon(platform_icon){
        if (platform_icon==='OSX') {
            platform_icon = 'apple'
        }
        return platform_icon.toLowerCase()
    }

    getPackagesModal(value,index){
        const game_pk = this.props.game_pk
        console.log({index})
        return (
            <ModalPackageCard key={index}
                button={
                    <Button basic key={index+value} color='green'>
                        <Icon name={this.getIcon(value)} />
                    </Button>
                }
                game_pk={game_pk}
                kernel={value}
                gameName={this.props.gameName}
                downloads={this.props.downloads}
            />
        )
    }

    getButtonsPlatforms(){
        const game_pk = this.props.game_pk
        const buttons_platforms = (this.reduceKernelPlatforms(this.props.packages)).map((value, index)=>
            this.getPackagesModal(value, index)
        )

        if(buttons_platforms.length > 0) {
            return buttons_platforms
        } else {
            return <Button basic color='red'>Não há instaladores cadastrados</Button>
        }
    }

    render () {

        return (
            <Card fluid>
                <Card.Content header="Download"/>
            <Card.Content>
                <Grid centered size='large'>
                    <Button.Group>
                        {this.getButtonsPlatforms()}
                    </Button.Group>
            </Grid>
            </Card.Content>
            <Card.Content extra/>
            </Card>
        );
    }
}

PackageCard.propTypes = {
    downloads: PropTypes.number.isRelated,
    packages: PropTypes.array.isRequired,
    game_pk: PropTypes.number.isRequired,
    gameName: PropTypes.string.isRequired
}

