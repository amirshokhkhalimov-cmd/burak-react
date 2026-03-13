import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes:(data:Product[]) => dispatch(setPopularDishes(data)),// 2nd setPopularDishes is reducer
});
const popularDishesRetriever = createSelector(
    retrievePopularDishes,
    (popularDishes) => ({popularDishes})
);

export  default function HomePage (){
//Selector: Store => Data (retrieve data from Redux Store)
const {setPopularDishes} = actionDispatch(useDispatch ());
const {popularDishes} = useSelector(popularDishesRetriever);

console.log( process.env.REACT_APP_API_URL);

    useEffect(() => {
        //Backend Server data request => Data(get data from backend server) => Slice:Data => Store (save data in Redux Store) => Selector: Store => Data (retrieve data from Redux Store) => Component (use data in component)
        const result = [
            [
    {
        "_id": "6987fe931e8f515f08c9a862",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Kebab",
        "productPrice": 14,
        "productLeftCount": 80,
        "productSize": "NORMAL",
        "productVolume": 1,
        "productDesc": "This is delicious Kebab",
        "productImages": [
            "uploads/products/87e82563-ab1d-40be-a731-8800b1362997.jpg"
        ],
        "productViews": 2,
        "createdAt": "2026-02-08T03:10:11.702Z",
        "updatedAt": "2026-03-01T12:32:22.266Z",
        "__v": 0
    },
    {
        "_id": "69869fed95949cbdd8976049",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Somsa",
        "productPrice": 5,
        "productLeftCount": 105,
        "productSize": "NORMAL",
        "productVolume": 1,
        "productDesc": "qaynoq somsa",
        "productImages": [
            "uploads/products/a8b454d2-7531-4023-8936-56ac702bd101.jpg"
        ],
        "productViews": 0,
        "createdAt": "2026-02-07T02:14:05.483Z",
        "updatedAt": "2026-03-01T12:16:54.675Z",
        "__v": 0
    },
    
]
        ];
        // Slice:Data=>Store (need to save in Redux Store)
        //@ts-ignore
        setPopularDishes (result);
    }, [] );

    console.log("popularDishes", popularDishes);

    return  (
    <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>

    </div>
    );
}