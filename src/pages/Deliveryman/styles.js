import styled from 'styled-components';
import { darken } from 'polished';
import searchIcon from '../../assets/searchicon.png'

export const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;

  flex-direction: column;

  strong {
    font-weight: bold;
    font-size: 20px;
  }

   >div {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{

      input {
        padding: 0 20px 0 35px;
        background: url(${searchIcon}) no-repeat center left 7px;
        background-color: #fff;
        background-size: 15px;
        width: 350px;
        height: 30px;
        border: 1px solid #DDD;
        border-radius: 5px;
        box-shadow: 0px 15px 20px #00000012;
      }
    }

    button {
      background: #7d40e7;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

        &:hover {
          background: ${darken(0.03, '#7159c1')};
        }

      > span {
        flex: 1;
        text-align: center;
        font-weight: bold;
        margin-right: 10px;
        padding: 10px;
      }

      svg {
        margin-left: 5px;
      }
    }

  }


`;

export const DeliveryTable = styled.table`
  border-collapse: separate !important;
  border-spacing: 0 15px !important;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}


td {
	border-color: transparent !important;
  background: #fff;

  img {
    height: 32px;
    width: 32px;
    margin-right: 4px;
    border-radius: 50%;
  }
}

td:nth-child(1) {
	border-radius: 4px 0 0 8px;
}

td:last-child {
	border-radius: 0 4px 4px 0;
}


th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: #000;
}
`;

export const Actions = styled.div`
  position: relative;
`;

export const ActionList = styled.div`
  display: none;

  &:hover{
    display:block;
  }

`;

export const Badge = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

&:hover + ${ActionList}{
    display:block;
  }
`;

export const Options = styled.button`
  position: absolute;
  width: 160px;
  left: calc(50% - 80px);
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #999999;
  box-shadow: 1px 1px 8px #000000;
  padding: 10px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
  }
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  & + div {
    margin-top: 2px;
    padding-top: 6px;
    border-top: 1px solid #eeeeee;
  }

  a {
    padding: 5px 0;
    color: #666;
    font-size: 12px;
    display: flex;
    align-items: start;
    margin-left: 2px;
    span {
      margin-left: 2px;
    }
  }
`;
