/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import BasicForm from '../components/forms/BasicForm';
import BasicTable from '../components/tables/BasicTables';
import AdvancedTable from '../components/tables/AdvancedTables';
import AsynchronousTable from '../components/tables/AsynchronousTable';
import Echarts from '../components/charts/Echarts';
import Recharts from '../components/charts/Recharts';
import Icons from '../components/ui/Icons';
import Buttons from '../components/ui/Buttons';
import Spins from '../components/ui/Spins';
import Modals from '../components/ui/Modals';
import Notifications from '../components/ui/Notifications';
import Tabs from '../components/ui/Tabs';
import Banners from '../components/ui/banners';
import Drags from '../components/ui/Draggable';
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/dashboard/Home';
import All from '../components/category/All';
import Meals from '../components/category/Meals';
import Dessert from '../components/category/Dessert';
import ShoppingCart from '../components/shopping/ShoppingCart';
import NewOrder from '../components/order/NewOrder';
import DishManagement from '../components/management/DishManagement';
import OrderManagement from '../components/management/OrderManagement';
import Gallery from '../components/ui/Gallery';
import BasicAnimations from '../components/animation/BasicAnimations';
import ExampleAnimations from '../components/animation/ExampleAnimations';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from '../components/widget/Bundle';
import Cssmodule from '../components/cssmodule';
import MapUi from '../components/ui/map';

const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />
                <Route exact path="/app/dashboard/home" component={Home} />
                <Route exact path="/app/category/all" component={All} />
                <Route exact path="/app/category/meals" component={Meals} />
                <Route exact path="/app/category/dessert" component={Dessert} />
                <Route exact path="/app/shopping/shoppingCart" component={ShoppingCart} />
                <Route exact path="/app/order/newOrder" component={NewOrder} />
                <Route exact path="/app/management/dishManagement" component={DishManagement} />
                <Route exact path="/app/management/orderManagement" component={OrderManagement} />
                <Route exact path="/app/form/basicForm" component={BasicForm} />
                <Route exact path="/app/table/basicTable" component={BasicTable} />
                <Route exact path="/app/table/advancedTable" component={AdvancedTable} />
                <Route exact path="/app/table/asynchronousTable" component={AsynchronousTable} />
                <Route exact path="/app/chart/echarts" component={Echarts} />
                <Route exact path="/app/chart/recharts" component={Recharts} />

                <Route exact path="/app/ui/icons" component={Icons} />
                <Route exact path="/app/ui/buttons" component={Buttons} />
                <Route exact path="/app/ui/spins" component={Spins} />
                <Route exact path="/app/ui/modals" component={Modals} />
                <Route exact path="/app/ui/notifications" component={Notifications} />
                <Route exact path="/app/ui/tabs" component={Tabs} />
                <Route exact path="/app/ui/banners" component={Banners} />
                <Route exact path="/app/ui/wysiwyg" component={WysiwygBundle} />
                <Route exact path="/app/ui/drags" component={Drags} />
                <Route exact path="/app/ui/gallery" component={Gallery} />
                <Route exact path="/app/ui/map" component={MapUi} />

                <Route exact path="/app/animation/basicAnimations" component={BasicAnimations} />
                <Route exact path="/app/animation/exampleAnimations" component={ExampleAnimations} />

                <Route exact path="/app/auth/basic" component={AuthBasic} />
                <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route exact path="/app/cssModule" component={Cssmodule} />

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}