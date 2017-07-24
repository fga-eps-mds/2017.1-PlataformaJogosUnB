
export const getKernel = function( packages) {
    const extensionsByKernel = {
        linux: ["deb","rpm","sh",],
        windows: ["exe"],
        apple: ["app"]
    };
    const kernels = [];
    packages.map((item) => {
       item.platforms.map((extension) => {
        Object.getOwnPropertyNames(extensionsByKernel).forEach(function(value){
                if(extensionsByKernel[value].indexOf(extension.extensions) > -1){
                    kernels.push(value);
                }       
            })      
       })})   
return kernels 
} 
