/*
    <copyright file="router.tsx" company="Microsoft Corporation">
    Copyright (c) Microsoft Corporation. All rights reserved.
    </copyright>
*/

import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddFavorites from "../components/add-favorites";
import OtherRoom from "../components/other-room";

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/OtherRoom" component={OtherRoom} />
                <Route exact path="/AddFavourite" component={AddFavorites} />
            </Switch>
        </BrowserRouter>
    );
}
export default ReactRouter;
