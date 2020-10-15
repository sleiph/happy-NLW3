import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrfanatosMap from './pages/OrfanatosMap'
import Orfanato from './pages/Orfanato'
import CreateOrfanato from './pages/CreateOrfanato'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrfanatosMap} />

                <Route path="/orfanatos/create" component={CreateOrfanato} />
                <Route path="/orfanatos/:id" component={Orfanato} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes