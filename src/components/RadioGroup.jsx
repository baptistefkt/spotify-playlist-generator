import { memo } from 'react'
import styled from 'styled-components'

const RadioContainer = styled.div`
  margin-bottom: 48px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  label {
    display: inline-block;
    margin-bottom: 12px;
    font-size: 18px;
    cursor: pointer;
  }
`

const FakeRadio = styled.span`
  position: relative;
  top: 1px;
  display: inline-block;
  margin-right: 4px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #191414;
  border: 1px solid rgba(255, 255, 255, 0.4);
  ${(props) => props.selected && 'border: 4px solid white;'}
`

const RadioGroupNonMemo = ({ tracksType, setTracksType }) => {
  return (
    <RadioContainer>
      <div>
        <FakeRadio
          selected={tracksType === 'top'}
          onClick={() => setTracksType('top')}
        />
        <input
          type="radio"
          id="top"
          name="top"
          value="top"
          onChange={() => setTracksType('top')}
          checked={tracksType === 'top'}
        />
        <label htmlFor="top">Only top tracks</label>
      </div>
      <div>
        <FakeRadio
          selected={tracksType === 'all'}
          onClick={() => setTracksType('all')}
        />
        <input
          type="radio"
          id="all"
          name="all"
          value="all"
          onChange={() => setTracksType('all')}
          checked={tracksType === 'all'}
        />
        <label htmlFor="all">All tracks</label>
      </div>
    </RadioContainer>
  )
}

export const RadioGroup = memo(RadioGroupNonMemo)
