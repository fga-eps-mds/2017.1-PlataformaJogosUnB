import React, {PropTypes} from "react";
import {Card, Button, Grid} from "semantic-ui-react";
import ModalPackageCard from "./ModalPackageCard"

export default class PackageCard extends React.Component {

    reducePlatforms(packages) {
        let platforms = [];
        if (packages !== undefined) {
            platforms = _.reduce(packages, (platform, bpackage) => { 
                const platform_names = _.map(bpackage.platforms, (platform_param) => platform_param.name);
                return platform.concat(platform_names);
            }, []);
        }
        return (platforms);
    }
    
    getButtonsPlatforms(){
        const buttons_platforms =(this.reducePlatforms(this.props.packages)).map((value)=> 
                <ModalPackageCard key={value}
                    button={<Button basic color='green'>{value}</Button>}
                    platform={value}
                />);
        if (buttons_platforms!=[]) {
            return buttons_platforms;
        }

        return <Button basic color='red'>Nao ha pacotes cadastrados</Button>;
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
    packages: PropTypes.array.isRequired,
}