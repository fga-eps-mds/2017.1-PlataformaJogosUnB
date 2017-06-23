import {getDjangoCookie} from "./getDjangoCookie";

export const downloadsPackageApi = (packageId) => {

  fetch(`/api/packages/${packageId}/downloads/`,
    {
      'method': 'POST',
      'headers': new Headers(
        {'Accept': 'application/json',
          'Content-type': 'application/json'}),
      'x-csrftoken': getDjangoCookie('csrftoken')
    }).then((response) => response.json())
      .then((sucess) => {console.log(sucess)})
      .catch((error) => {console.error(error)});
}
