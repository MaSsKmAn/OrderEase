import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Rating } from "@mui/material";
import {
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addToFavourite, deleteFromFavourite, getFavourite } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const Card = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 180px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
  @media (max-width: 600px) {
    height: 180px;
  }
`;

const Span = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: green;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
`;

const MenuItem = styled.div`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Favourite = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavourite = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      await addToFavourite(token, { productId: product?._id });
      setFavorite(true);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.response.data.message,
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      await deleteFromFavourite(token, { productId: product?._id });
      setFavorite(false);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.response.data.message,
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    try {
      const token = localStorage.getItem("orderease-app-token");
      const response = await getFavourite(token, { productId: product?._id });
      const isFavorite = response.data?.some(
        (favorite) => favorite._id === product?._id
      );
      setFavorite(isFavorite);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.response.data.message,
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <Card>
      <Image src={product?.img} />
      <Menu>
        <MenuItem onClick={() => (favorite ? removeFavourite() : addFavourite())}>
          {favoriteLoading ? (
            <CircularProgress size={24} />
          ) : (
            <>
              {favorite ? (
                <FavoriteRounded style={{ fontSize: "24px", color: "red" }} />
              ) : (
                <FavoriteBorder style={{ fontSize: "24px" }} />
              )}
            </>
          )}
        </MenuItem>
      </Menu>
      <Rate>
        <Rating value={3.5} readOnly />
      </Rate>
      <Details onClick={() => product && navigate(`/product/${product._id}`)}>
        <Title>{product?.name}</Title>
        <Desc>{product?.desc}</Desc>
        <Price>
          ${product?.price?.org} <Span>${product?.price?.mrp}</Span>
          <Percent> (${product?.price?.off}% Off) </Percent>
        </Price>
      </Details>
    </Card>
  );
};

export default Favourite;
