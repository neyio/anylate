import * as React from "react";
import styled from "styled-components";

const Flex = props => {
  const { children, ...rest } = props;
  return <Container {...rest}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: ${({ auto }) => (auto ? "1 1 auto" : "initial")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;

export default Flex;
