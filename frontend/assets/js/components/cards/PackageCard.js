import React, {PropTypes} from "react";
import {Card, Button, Grid, Icon} from "semantic-ui-react";
import ModalPackageCard from "./ModalPackageCard"

//TODO achar um jeito mais inteligente de pegar as extensões permitidas por kernel
//TODO adicionar arquitetura no pacote
//TODO mudar atributo de Plataforma, de "extensions" para "extension"
const extensionsByKernel = {
  "Linux": ["deb","rpm"],
  "Windows": ["exe"],
  "OSX": ["app"],
};

export default class PackageCard extends React.Component {

    reduceKernelPlatforms(packages) {
        let platforms = [];
        if (packages !== undefined) {
            platforms = _.reduce(packages, (platform, bpackage) => { 
                const platform_kernel = _.map(bpackage.platforms, (platform_param) => platform_param.kernel);
                return platform.concat(platform_kernel);
            }, []);
        }
        console.log(platforms)
        return (platforms);
    }
    
    getIcon(platform_icon){
        if (platform_icon==='OSX') {
            platform_icon = 'apple'
        }
        platform_icon.toLowerCase()
        return platform_icon;
    }

    getButtonsPlatforms(){
        const game_pk = this.props.game_pk
        const buttons_platforms = (this.reduceKernelPlatforms(this.props.packages)).map((value)=>

                <ModalPackageCard key={value}
                    button={
                        <Button basic color='green'>
                            <Icon name={this.getIcon(value)} />
                        </Button>
                    }
                    platform={this.handlePackages(value)}
                    game_pk={game_pk}
                    kernel={value}
                    gameName={this.props.gameName}
                />);

        if (buttons_platforms!=[]) {
            return buttons_platforms;
        }

        return <Button basic color='red'>Nao ha pacotes cadastrados</Button>;
    }


    getPlatforms(packageExtension,platforms){
       var filteredPlatforms = _.filter(platforms,(platform) => {
          return platform.extensions == packageExtension 
       });
    
       return filteredPlatforms
    }

    getPackageExtension(packagePath){
      var index = packagePath.lastIndexOf('.');
      var packageExtension = packagePath.slice(index + 1)
      return packageExtension
    }

    packageIsRelatedToKernel(kernel,packageExtension){
      var isRelated = _.includes(extensionsByKernel[kernel], packageExtension)
      return isRelated
    }

    handlePackages(kernel){
        const packages = this.props.packages
        var packagesByKernel = {}
        var plat = []

        if(packages !== undefined){
            packages.forEach((eachPackage) => {
                var packageExtension = this.getPackageExtension(eachPackage['package'])
                if(this.packageIsRelatedToKernel(kernel,packageExtension)){
                    packagesByKernel[eachPackage] = []
                    packagesByKernel[eachPackage].push(kernel)
                    
                    plat = this.getPlatforms(packageExtension,eachPackage.platforms)
                }
            }); 
        }
        return plat;
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
