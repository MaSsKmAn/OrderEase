import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: ${({ isDisabled, isLoading }) =>
    isDisabled || isLoading ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: ${({ small }) => (small ? "10px 28px" : "16px 26px")};
  box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 40};
  border: 1px solid ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    padding: ${({ small }) => (small ? "8px 12px" : "8px 12px")};
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
      background: ${theme.secondary};
      border: 1px solid ${theme.secondary};
    `
      : `
      background: ${theme.primary};
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}

  ${({ outlined, theme }) =>
    outlined &&
    `
    background: transparent;
    color: ${theme.primary};
    box-shadow: none;
  `}

  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  const handleClick = () => {
    if (!isDisabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
      type={type}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;

