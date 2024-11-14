import { css } from "styled-components";

export const baseNavItemStyle = css`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 10px 15px;
  font-size: 1.3em;
  position: relative;
  display: inline-block;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: ${({ theme }) => theme.primary};
    transition: width 0.4s ease, background-color 0.4s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
    background: ${({ theme }) => theme.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
  }
`;
