import React from 'react';
import { shallow, mount } from 'enzyme';
import Routes, { OrderScreen, ShippingScreen, HomeScreen } from '../src/App';
import {
    MemoryRouter
} from 'react-router'
import { Route } from 'react-router-dom';

let pathMap = {};
describe('App', () => {
    beforeAll(() => {
        const component = shallow(<Routes />);
        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        console.log(pathMap)
    })
    it('should show Home component for / router (getting array of routes)', () => {

        expect(pathMap['/']).toBe(HomeScreen);
    })
    it('should show News Feed component for /news router', () => {
        expect(pathMap['/order/:id']).toBe(OrderScreen);
    })
    it('should show News Feed component techdomain for /news router', () => {
        expect(pathMap['/shipping']).toBe(ShippingScreen);
    })
    it('should show No match component for route not defined', () => {
        expect(pathMap['/search/:keyword/page/:pageNumber']).toBe(HomeScreen);
    })

})