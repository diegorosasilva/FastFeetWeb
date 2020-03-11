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

    >div {
    display: flex;

    a {
      background: #7159c1;
      color: #FFF;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      margin-left: 20px;

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
  }

  form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    div {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input, select {
      background: #FFF;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 44px;
      color: #DDD;
      margin: 0 0 10px;
    }
  }
`;
