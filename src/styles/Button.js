import styled from 'styled-components/macro'
import { mixins } from '.'
import theme from './theme'

const { colors, fontSizes } = theme

export const Button = styled.button`
  ${mixins.button}
  background-color: ${colors.green};
  color: ${colors.white};
  border: none;
  padding: 17px 35px;
  min-width: 160px;
  font-size: ${fontSizes.base};
  letter-spacing: 1.76px;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`

export const SecondaryButton = styled.button`
  ${mixins.button}
  background-color: transparent;
  border: 1px solid #535353;
  color: ${colors.white};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1.76px;
  line-height: 18px;
  padding: 8px 34px;
  white-space: nowrap;
  will-change: transform;

  &:hover,
  &:focus {
    border-color: ${colors.white};
  }
`
