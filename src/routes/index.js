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
import Home from '../components/dashboard/Home';
import All from '../components/category/All';
import Meals from '../components/category/Meals';
import Dessert from '../components/category/Dessert';
import ShoppingCart from '../components/shopping/ShoppingCart';
import NewOrder from '../components/order/NewOrder';
import UserMessage from '../components/user/UserMessage';
import DishManagement from '../components/management/DishManagement';
import OrderManagement from '../components/management/OrderManagement';
import StoreMessage from '../components/management/message/StoreMessage';
import AdminMessage from '../components/management/message/AdminMessage';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';
import Bundle from '../components/widget/Bundle';


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
                <Route exact path="/app/dashboard/home" component={Home} />
                <Route exact path="/app/category/all" component={All} />
                <Route exact path="/app/category/meals" component={Meals} />
                <Route exact path="/app/category/dessert" component={Dessert} />
                <Route exact path="/app/shopping/shoppingCart" component={ShoppingCart} />
                <Route exact path="/app/order/newOrder" component={NewOrder} />
                <Route exact path="/app/user/userMessage" component={UserMessage} />

                <Route exact path="/app/management/dishManagement" component={DishManagement} />
                <Route exact path="/app/management/orderManagement" component={OrderManagement} />
                <Route exact path="/app/management/message/storeMessage" component={StoreMessage} />
                <Route exact path="/app/management/message/adminMessage" component={AdminMessage} />
                <Route exact path="/app/form/basicForm" component={BasicForm} />
                <Route exact path="/app/table/basicTable" component={BasicTable} />
                <Route exact path="/app/table/advancedTable" component={AdvancedTable} />
                <Route exact path="/app/table/asynchronousTable" component={AsynchronousTable} />
                <Route exact path="/app/chart/echarts" component={Echarts} />
                <Route exact path="/app/chart/recharts" component={Recharts} />

                <Route exact path="/app/auth/basic" component={AuthBasic} />
                <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}