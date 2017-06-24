import React from "react";
import ReactDOM from "react-dom";
import MainRoutes from "./routes/MainRoutes";
import MenuLayout from "./layout/MenuLayout";
import {BrowserRouter} from "react-router-dom";
import "../../public/semantic/semantic";
import "../../public/semantic/semantic.less";

class App extends React.Component {
    render () {

        return (
            <BrowserRouter>
                <div>
                    <MenuLayout />
                    <MainRoutes />
                </div>
            </BrowserRouter>
        );

    }
}

ReactDOM.render(<App />, document.getElementById("container"));
