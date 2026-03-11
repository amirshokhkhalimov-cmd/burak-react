import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

export  default function HomePage (){
//Selector: Store => Data (retrieve data from Redux Store)

    useEffect(() => {
        //Backend Server data request => Data(get data from backend server) => Slice:Data => Store (save data in Redux Store) => Selector: Store => Data (retrieve data from Redux Store) => Component (use data in component)

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