import PageNotFound from "components/commons/PageNotFound";
import ProductList from "components/ProductList/ProductList";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import Product from "./components/Product/Product";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from="/" to="/products" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
