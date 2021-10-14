import { css } from 'styled-components/macro'
import theme from './theme'
const { colors, fontSizes, fonts } = theme

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,

  outline: css`
    outline: 1px solid red;
  `,

  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,

  coverShadow: css`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `,

  button: css`
    display: inline-block;
    border-radius: 500px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    font-weight: 700;
    font-family: ${fonts.primary};
    transition: all 53ms cubic-bezier(0.3, 0, 0, 1);
    &:focus,
    &:active {
      outline: 0;
    }
  `,

  greenButton: css`
    display: inline-block;
    background-color: ${colors.green};
    color: ${colors.white};
    font-weight: 700;
    font-size: ${fontSizes.xs};
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 11px 24px;
    margin: 20px 0;
    cursor: pointer;
    transition: ${theme.transition};
    &:hover,
    &:focus {
      background-color: ${colors.offGreen};
      outline: 0;
    }
  `,
}

export default mixins
