export const dataListApi = (route, handleData) => {
    fetch(route,
        {
            "headers": new Headers({
                "Accept": "application/json"
            }),
            "method": "GET"
        })
        .then((response) => response.json())
        .then(handleData)
        .catch((error) => {

            console.error(error);

        });
}
