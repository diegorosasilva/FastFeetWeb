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



    a {
      background: #7159c1;
      color: #FFF;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;

        &:hover {
          background: ${darken(0.03, '#7159c1')};
        }

        > div {
          display: flex;
          align-items: center;
          padding: 12px;
          background: rgba(0, 0, 0, 0);

          svg {
            margin-right: 5px;
          }
        }

        > span {
          flex: 1;
          text-align: center;
          font-weight: bold;
          margin-right: 10px;
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
  color: #7159c1;
}
`;
