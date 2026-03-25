import { useState, SyntheticEvent, useEffect, } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";
import { setPausedOrders, seProcessOrders, setFinishedOrders, } from "./slice";
import { Order, OrderInquiry } from "../../../lib/data/types/order";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/data/enums/member.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),// 2nd setPopularDishes is reducer
    seProcessOrders: (data: Order[]) => dispatch(seProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data))
});

export default function OrdersPage() {
    const { setPausedOrders, seProcessOrders, setFinishedOrders } =
        actionDispatch(useDispatch());
    const {authMember, orderBuilder } = useGlobals();
    const [value, setValue] = useState("1");
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE,
    });

    useEffect(() => {
        const order = new OrderService();
        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
            .then((data) => setPausedOrders(data))
            .catch((err) => console.log(err));

        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
            .then((data) => seProcessOrders(data))
            .catch((err) => console.log(err));

        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
            .then((data) => setFinishedOrders(data))
            .catch((err) => console.log(err));
    }, [orderInquiry, orderBuilder])

    /** HANDLERS **/

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={"order-page"}>
            <Container className="order-container">
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    className={"table_list"}
                                >
                                    <Tab label="PAUSED ORDERS" value={"1"} />
                                    <Tab label="PROCESS ORDERS" value={"2"} />
                                    <Tab label="FINISHED ORDERS" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>

                        <Stack className={"order-main-content"}>
                            <PausedOrders setValue={setValue} />
                            <ProcessOrders setValue={setValue} />
                            <FinishedOrders />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={
                                            authMember?.memberImage
                                                ? `${serverApi}/${authMember.memberImage}`
                                                : "/icons/default-user.svg"
                                        }
                                    className={"order-user-avatar"}
                                />

                                <div className={"order-user-icon-box"}>
                                    <img
                                        src={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                                        className={"order-user-prof-img"}
                                    />
                                </div>
                            </div>

                            <span className={"order-user-name"}>{authMember?.memberNick }</span>
                            <span className={"order-user-name"}>{authMember?.memberType}</span>
                        </Box>

                        <Box className={"liner"}></Box>

                        <div className={"order-user-address"}>
                            <img src={"/icons/location.svg"}
                            />
                            <span className={"spec-address-txt"}>
                                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "Do not exist"}
                            </span>

                        </div>
                    </Box>





                    {/* Card Info */}
                    <Box className={"order-info-box"}>

                        <input
                            className={"card-input "}
                            placeholder="Card number : 5243 4090 2002 7495"
                        />

                        <div >
                            <input
                                className={"card-half-input "}
                                placeholder="07 / 24"
                            />

                            <input
                                className={"card-half-input "}
                                placeholder="CVV : 010"
                            />
                        </div>

                        <input
                            // In the same class as card-input to make it same as card number input//
                            className={"card-input"}
                            placeholder="Martin User"
                        />

                        <div className={"payment-logos"}>
                            <img src={"/icons/western-card.svg"} />
                            <img src={"/icons/master-card.svg"} />
                            <img src={"/icons/paypal-card.svg"} />
                            <img src={"/icons/visa-card.svg"} />
                        </div>

                    </Box>

                </Stack>
            </Container>
        </div>
    );
}