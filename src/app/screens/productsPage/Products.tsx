import React, { useEffect } from "react";
import { Box, Button, ButtonGroup, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/data/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch:Dispatch) => ({
  setProducts: (data:Product[]) => dispatch(setProducts(data)),
});

const producstRetriever = createSelector (retrieveProducts, (products) => ({
  products,
}));




const logos = [
  { imagePath: "/img/gurme.webp" },
  { imagePath: "/img/seafood.webp" },
  { imagePath: "/img/sweets.webp" },
  { imagePath: "/img/doner.webp" }
];

export default function Products() {
const {setProducts} = actionDispatch(useDispatch());
const {products} = useSelector(producstRetriever);

useEffect ( () => {
  const product = new ProductService();
  product
  .getProducts({
    page:1,
    limit:8,
    order:"createdAt",
    productCollection: ProductCollection.DISH,
  }).then((data) => setProducts(data))
  .catch((err) => console.log(err));
}, [] );
  
  return (
    <Container maxWidth="lg">
      <Box className="headerRow">
        <h1 className="restaurantTitle">Burak Restaurant</h1>

        <Box className="searchArea">
          <TextField
            size="small"
            placeholder="Type here"
            variant="outlined"
            className="searchInput"
          />

          <Button
            variant="contained"
            className="searchButton"
            endIcon={<SearchIcon />}
          >
            SEARCH
          </Button>
        </Box>
      </Box>

      {/* Filter */}
      <Stack className={"dishes-filter-section"}>
        <Stack className={"dishes-filter-box"}>
          <Button variant="contained" color="primary" className="order">
            New
          </Button>

          <Button variant="contained" color="secondary" className="order">
            Price
          </Button>

          <Button variant="contained" color="secondary" className="order">
            Views
          </Button>
        </Stack>
      </Stack>

      {/* ✅ FIX: Category + Menu must be in ONE ROW */}
      <Stack className={"menu-layout"}>
        {/* Category-List */}
        <Stack className={"dishes-category-section"}>
          <Button variant="contained" color="primary" className="category-list-btn">
            Dish
          </Button>

          <Button variant="contained" color="secondary" className="category-list-btn">
            Salad
          </Button>

          <Button variant="contained" color="secondary" className="category-list-btn">
            Drink
          </Button>

          <Button variant="contained" color="secondary" className="category-list-btn">
            Desert
          </Button>

          <Button variant="contained" color="secondary" className="category-list-btn">
            Other
          </Button>
        </Stack>

        {/* Menu */}
        <Stack className={"product-wrapper"}>
          {products.length !== 0 ? (
            products.map((product, index) => {
               const imagePath = `${serverApi}/${product.productImages[0]}`;
               const sizeVolume = product.productCollection === ProductCollection.DRINK
               ? product.productVolume +"litr"
               : product.productSize + "size";
              return (
                <Stack key={index} className={"product-card"}>
                  <Stack
                    className={"product-img"}
                    sx={{ backgroundImage: `url(${imagePath})` }}
                  >
                    <div className={"product-sale"}>{sizeVolume}</div>

                    <Button className={"shop-btn"}>
                      <img
                        src={"/icons/shopping-cart.svg"}
                        style={{ display: "flex" }}
                        alt="cart"
                      />
                    </Button>

                    <Button className={"view-btn"} sx={{ right: "36px" }}>
                      <Badge badgeContent={product.productViews} color="secondary">
                        <RemoveRedEyeIcon
                          sx={{ 
                            color: 
                            product.productViews ===  0 ? "gray" : "white",
                          }}
                        />
                      </Badge>
                    </Button>
                  </Stack>

                  <Box className={"product-desc"}>
                    <span className={"product-title"}>{product.productName}</span>

                    <div className={"product-price"}>
                      <MonetizationOnIcon />
                      {product.productPrice}
                    </div>
                  </Box>
                </Stack>
              );
            })
          ) : (
            <Box className="no-data">Products are not available!</Box>
          )}

        </Stack>
      </Stack>
      {/* Pagination */}
      <Stack className={"pagination-section"}>
        <Pagination
          count={3}
          page={1}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              color={"secondary"}
            />
          )}
        />
      </Stack>

      {/* BRAND LOGO */}
      <div className={"brand-card"}>

        <Box className={"brand-title"}>
          Our Family Brands

          <Box className={"brand-logo"}>

            {logos.map((logo, index) => {
              return (
                <Stack
                  key={index}
                  className={"brand-logo-img"}
                  sx={{
                    backgroundImage: `url(${logo.imagePath})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              );
            })}
            <Stack />

          </Box>
        </Box>
      </div>

      {/* MAP */}
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"map-title"}>Our Address</Box>
          <iframe
  style={{ marginTop: "60px" }}
  src="https://www.google.com/maps?q=Tashkent&output=embed"
  width="1320"
  height="500"
  loading="lazy"
/>
          </Stack>

        </Container>
      </div>
    </Container>
  );
}

