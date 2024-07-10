import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Rating } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
  createPaymentOrder, // Import createPaymentOrder API function
} from "../api"; // Adjust the import path as per your project structure
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";
import Button from "../components/Button";


const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  max-width: 1400px;
  display: flex;
  gap: 40px;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ImagesWrapper = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  border-radius: 12px;
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 400px;
    height: 400px;
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Ingredients = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Item = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 4px 12px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
  @media only screen and (max-width: 700px) {
    gap: 12px;
    padding: 12px 0px;
  }
`;

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetailsData();
    checkFavoriteStatus();
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    try {
      const response = await getProductDetails(id);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        openSnackbar({
          message: error.message || "Failed to fetch product details",
          severity: "error",
        })
      );
    }
  };

  const checkFavoriteStatus = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      const response = await getFavourite(token, { productId: id });
      const isFavorited = response.data?.some((fav) => fav._id === id);
      setFavorite(isFavorited);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.message || "Failed to fetch favorite status",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addToFavourites = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      await addToFavourite(token, { productId: id });
      setFavorite(true);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.message || "Failed to add to favorites",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFromFavourites = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      await deleteFromFavourite(token, { productId: id });
      setFavorite(false);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.message || "Failed to remove from favorites",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addToCartHandler = async () => {
    setCartLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      await addToCart(token, { productId: id, quantity: 1 });
      navigate("/cart");
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.message || "Failed to add to cart",
          severity: "error",
        })
      );
    } finally {
      setCartLoading(false);
    }
  };

  const checkoutHandler = async (amount) => {
    try {
      const { data: { key } } = await axios.get("http://localhost:8080/api/getkey");
      const { data: { order } } = await axios.post("http://localhost:8080/api/checkout", { amount });
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:8080/api/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.img} />
          </ImagesWrapper>
          <Details>
            <Title>{product?.name}</Title>
            <Rating value={product?.rating || 0} precision={0.5} readOnly />
            <Price>
              ₹{product?.price?.org} <Span>₹{product?.price?.mrp}</Span>
              <Percent>
                {Math.round(
                  ((product?.price?.mrp - product?.price?.org) /
                    product?.price?.mrp) *
                    100
                )}
                % off
              </Percent>
            </Price>
            <Desc>{product?.desc}</Desc>
            <Ingredients>
              Ingredients
              <Items>
                {product?.ingredients?.map((item) => (
                  <Item key={item}>{item}</Item>
                ))}
              </Items>
            </Ingredients>
            <ButtonWrapper>
              <Button
                text="Add to Cart"
                onClick={addToCartHandler}
                disabled={cartLoading}
              />
              <Button
                text="Buy Now"
                onClick={checkoutHandler}
                disabled={cartLoading}
              />
            </ButtonWrapper>
            {favoriteLoading ? (
              <CircularProgress size={20} />
            ) : favorite ? (
              <FavoriteRounded
                onClick={removeFromFavourites}
                color="error"
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderOutlined
                onClick={addToFavourites}
                style={{ cursor: "pointer" }}
              />
            )}
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default FoodDetails;

