import styled from 'styled-components';
import { darken } from 'polished';

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

      >div {
        display: flex;
      }
    }

  form {
    height: 100%;
    background: #ffffff;
    padding: 20px;
    margin-top: 30px;
    border-radius: 4px;
    .line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .group {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0px 10px;
        span {
          color: #444;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 7px;
        }
      }
    }
    input {
      background: #fff;
      box-shadow: none; /* box-shadow não está funcionando. PQ??? */
      border: 1 solid #999;
      border-radius: 5px;
      height: 30px;
      padding: 5px 10px;
      color: #999;
      margin: 0 0 10px;
    }
  }
`;

export const Button = styled.button`
  background: ${props => (props.cancel ? '#CCCCCC' : '#7d40e7')};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

    &:hover {
      background: ${props => (props.cancel ? darken(0.03, '#CCCCCC') : darken(0.03, '#7d40e7'))};

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
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.size ? `${props.size}px` : '100%')};
  margin-left: ${props => (props.leftSpace ? '16px' : 0)};
  margin-right: ${props => (props.rightSpace ? '16px' : 0)};
`;
