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
