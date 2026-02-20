import React from "react";
import { Box, Button, ButtonGroup, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },

];

const logos = [
  { imagePath: "/img/gurme.webp" },
  { imagePath: "/img/seafood.webp" },
  { imagePath: "/img/sweets.webp" },
  { imagePath: "/img/doner.webp" }
];

export default function Products() {
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
              return (
                <Stack key={index} className={"product-card"}>
                  <Stack
                    className={"product-img"}
                    sx={{ backgroundImage: `url(${product.imagePath})` }}
                  >
                    <div className={"product-sale"}>Large size</div>

                    <Button className={"shop-btn"}>
                      <img
                        src={"/icons/shopping-cart.svg"}
                        style={{ display: "flex" }}
                        alt="cart"
                      />
                    </Button>

                    <Button className={"view-btn"} sx={{ right: "36px" }}>
                      <Badge badgeContent={20} color="secondary">
                        <RemoveRedEyeIcon
                          sx={{ color: 20 > 0 ? "gray" : "white" }}
                        />
                      </Badge>
                    </Button>
                  </Stack>

                  <Box className={"product-desc"}>
                    <span className={"product-title"}>{product.productName}</span>

                    <div className={"product-price"}>
                      <MonetizationOnIcon />
                      {12}
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

