import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Product, ProductInquiry } from "../../../lib/data/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";

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

interface ProductsProps {
  onAdd:(item:CartItem)=>void;
}


export default function Products(props:ProductsProps) {
  const{onAdd} = props;
const {setProducts} = actionDispatch(useDispatch());
const {products} = useSelector(producstRetriever);

const [productSearch, setProductSearch] = useState<ProductInquiry>({
  page:1,
    limit:8,
    order:"createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
});

/** For Search Handler **/
const [searchText, setSearchText] = useState<string>("");

const history = useHistory();

useEffect ( () => {
  const product = new ProductService();
  product
  .getProducts(productSearch)
  .then((data) => setProducts(data))
  .catch((err) => console.log(err));
}, [productSearch] );

/** BU mantiq search buttonda yozilgan valueni o`chirgandan keyin menuga qaytadi **/
useEffect (() => {
  if(searchText === "") {
    productSearch.search = "";
    setProductSearch({...productSearch });

  }
}, [searchText]);



/** HANDLERS **/
const searchCollectionHandler = (collection:ProductCollection) => {
  productSearch.page = 1;
  productSearch.productCollection = collection;
  setProductSearch({...productSearch });
};

/** Filter Handler **/
const searchOrderHandler = (order:string) => {
  productSearch.page = 1;
  productSearch.order = order;
  setProductSearch({...productSearch });
};

/** Search Handler **/
const searchProductHandler = ()=> {
  productSearch.search = searchText;
  setProductSearch({...productSearch});
};

/** Pagination HAndler **/
const paginationHandler = (e:ChangeEvent<any>, value:number) => {
  productSearch.page = value;
  setProductSearch({...productSearch});
};

/** Choose Dish HAndler**/
const chooseDishHandler = (id:string) => {
  history.push(`/products/${id}`);
};
  
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
            value={searchText}
            onChange={(e) => setSearchText (e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter")  searchProductHandler();
            }}
           />

          <Button
            variant="contained"
            className="searchButton"
            endIcon={<SearchIcon />}
            onClick={searchProductHandler}
          >
            SEARCH
          </Button>
        </Box>
      </Box>

      {/* Filter */}
      <Stack className={"dishes-filter-section"}>
        <Stack className={"dishes-filter-box"}>
          <Button 
          variant="contained" 
          color={productSearch.order === "new" ? "primary" : "secondary"}
          className="order"
          onClick={() => searchOrderHandler ("new")} /** createdAt **/
          >
            New
          </Button>

          <Button 
          variant="contained" 
         color={productSearch.order === "productPrice" ? "primary" : "secondary"}
          className="order"
          onClick={() => searchOrderHandler ("productPrice")}
          >
            Price
          </Button>

          <Button 
          variant="contained" 
          color={productSearch.order === "productViews" ? "primary" : "secondary"}
          className="order"
          onClick={() => searchOrderHandler ("productViews")}
          >
            Views
          </Button>
        </Stack>
      </Stack>

      {/* ✅ FIX: Category + Menu must be in ONE ROW */}
      <Stack className={"menu-layout"}>
        {/* Category-List */}
        <Stack className={"dishes-category-section"}>
          <Button 
          variant="contained" 
          color={productSearch.productCollection === ProductCollection.DISH ?"primary" : "secondary"} 
          className="category-list-btn"
          onClick={()=>
            searchCollectionHandler(ProductCollection.DISH)
          }
          >
            Dish
          </Button>

          <Button 
          variant="contained" 
          color={productSearch.productCollection === ProductCollection.SALAD ?"primary" : "secondary"}
          className="category-list-btn"
          onClick={()=>
            searchCollectionHandler(ProductCollection.SALAD)
          }
          >
            Salad
          </Button>

          <Button 
          variant="contained" 
          color={productSearch.productCollection === ProductCollection.DRINK ?"primary" : "secondary"}
          className="category-list-btn"
          onClick={()=>
            searchCollectionHandler(ProductCollection.DRINK)
          }
          >
            Drink
          </Button>

          <Button 
          variant="contained" 
          color={productSearch.productCollection === ProductCollection.DESSERT ?"primary" : "secondary"}
          className="category-list-btn"
          onClick={()=>
            searchCollectionHandler(ProductCollection.DESSERT)
          }
          >
            Dessert
          </Button>

          <Button 
          variant="contained" 
          color={productSearch.productCollection === ProductCollection.OTHER ?"primary" : "secondary"}
          className="category-list-btn"
          onClick={()=>
            searchCollectionHandler(ProductCollection.OTHER)
          }
          >
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
                <Stack key={product._id} className={"product-card"}
                onClick={() => chooseDishHandler (product._id)}
                >
                  <Stack
                    className={"product-img"}
                    sx={{ backgroundImage: `url(${imagePath})` }}
                  >
                    <div className={"product-sale"}>{sizeVolume}</div>

                    <Button className={"shop-btn"} 
                    onClick={(e)=> {
                      
                      onAdd({
                        _id:product._id,
                        quantity:1,
                        name:product.productName,
                        price:product.productPrice,
                        image:product.productImages[0],
                      });
                      e.stopPropagation();
                    }}
                    >
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
          count={products.length !== 0 
            ? productSearch.page + 1
            : productSearch.page 
          }
          page={productSearch.page}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              color={"secondary"}
            />
          )}
          onChange={paginationHandler}
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

