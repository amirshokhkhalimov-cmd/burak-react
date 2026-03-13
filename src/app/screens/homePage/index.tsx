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
import { setNewDishes, setPopularDishes } from "./slice";
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes:(data:Product[]) => dispatch(setPopularDishes(data)),// 2nd setPopularDishes is reducer
     setNewDishes:(data:Product[]) => dispatch(setNewDishes(data)),
});


export  default function HomePage (){
//Selector: Store => Data (retrieve data from Redux Store)
const {setPopularDishes, setNewDishes} = actionDispatch(useDispatch ());




    useEffect(() => {
        //Backend Server data request => Data(get data from backend server) => Slice:Data => Store (save data in Redux Store) => Selector: Store => Data (retrieve data from Redux Store) => Component (use data in component)
        const product = new ProductService();
        product.getProducts({
            page:1,
            limit:4,
            order:"productViews",
            // productCollection:ProductCollection.DISH,
        })
        .then((data)=>{
            // console.log("data passsed here:",data);
            setNewDishes(data);
        })
        .catch((err)=> console.log(err));


        product.
        getProducts({
            page:1,
            limit:4,
            order:"createdAt",
            // productCollection:ProductCollection.DISH,
        })
        .then((data)=>{
            // console.log("data passsed here:",data);
            setPopularDishes(data);
        })
        .catch((err)=> console.log(err));


        // Slice:Data=>Store (need to save in Redux Store)
        
        
    }, [] );

    

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