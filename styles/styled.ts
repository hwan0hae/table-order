import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  padding: 16px 32px;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
`;

export const Box = styled.div`
  background-color: ${(props) => props.theme.containerColor};
  width: 100%;
  margin-bottom: 10px;
  padding: 30px 0;
  border-radius: 1px;
  border: 1px solid ${(props) => props.theme.borderLine};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 2em;
  margin-bottom: 16px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
export const Btn = styled.button`
  font-size: 1em;
  background-color: ${(props) => props.theme.containerColor};
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.borderLine};
  color: ${(props) => props.theme.textColor};

  cursor: pointer;
  &:hover {
    filter: brightness(1.3);
  }
  &:active {
    filter: brightness(0.7);
  }
`;

export const MenuNavContainer = styled.nav`
  margin-bottom: 8px;
`;
