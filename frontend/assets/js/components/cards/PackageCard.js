import React, {PropTypes} from "react";
import {Card, Button, Grid, Icon} from "semantic-ui-react";
import ModalPackageCard from "./ModalPackageCard"

//TODO achar um jeito mais inteligente de pegar as extensões permitidas por kernel
//TODO adicionar arquitetura no pacote
//TODO mudar atributo de Plataforma, de "extensions" para "extension"
const extensionsByKernel = {
  "linux": ["deb","rpm"],
  "windows": ["exe"],
  "mac": ["algumaaleatoria"],
};

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


    getPlatforms(packageExtension,platforms){
       var filteredPlatforms = _.filter(platforms,(platform) => {
          return platform.extensions == packageExtension 
       });
       filteredPlatforms = _.map(filteredPlatforms, (platform) => platform.name);
    
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

        if(packages !== undefined){
            packages.forEach((eachPackage) => {
                var packageExtension = this.getPackageExtension(eachPackage['package'])
                if(this.packageIsRelatedToKernel(kernel,packageExtension)){
                    packagesByKernel[eachPackage] = []
                    packagesByKernel[eachPackage].push(kernel)
                    
                    var platforms = this.getPlatforms(packageExtension,eachPackage.platforms) 
                }
            }); 
        }
    }
    
    render () {
        
        return (
            <Card fluid>
                <Card.Content header="Download"/>
                <Card.Content>
                    <Grid centered size='large'>
                        <Button.Group>
                            <Button onClick={() => this.handlePackages("linux")}><Icon name="linux" /></Button>
                            <Button onClick={() => this.handlePackages("windows")}><Icon name="windows" /></Button>
                            <Button onClick={() => this.handlePackages("apple")}><Icon name="apple" /></Button>
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
