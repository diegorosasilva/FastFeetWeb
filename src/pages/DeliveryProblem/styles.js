import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;

  flex-direction: column;

  strong {
    font-weight: bold;
    font-size: 20px;
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
  width: 180px;
  left: calc(50% - 90px);
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

export const ModalTags = styled.div`
  span {
    font-weight: bold;
    font-size: 14px;
  }
`;
