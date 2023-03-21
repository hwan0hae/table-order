import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

export const Container = styled.div`
  display: flex;
  padding: 16px 32px;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
`;

export const Box = styled.section`
  background-color: ${(props) => props.theme.containerColor};
  width: 100%;
  margin-bottom: 10px;
  padding: 30px 16px;
  border-radius: 1px;
  border: 1px solid ${(props) => props.theme.borderLine};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 2em;
  margin-bottom: 16px;
`;
export const SubTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 1.2em;
  margin-bottom: 8px;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.textColor};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 12px 0;
  align-items: center;
  justify-content: center;
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

export const MenuNavContainer = styled.aside`
  margin-bottom: 8px;
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, auto));
  justify-content: space-evenly;
  grid-gap: 16px;
`;

export const HorizontalScrollContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;

  div {
    flex: 0 0 auto;
  }
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.textColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${(props) => props.theme.borderLine};
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const TableBox = styled.table`
  border: solid 0.5px ${(props) => props.theme.borderLine};
  border-collapse: collapse;
  color: ${(props) => props.theme.textColor};
  margin: 8px;
`;

export const Th = styled.th`
  border: solid 0.5px ${(props) => props.theme.borderLine};
  padding: 6px 12px;
  font-weight: 600;
  background-color: gray;
`;

export const Td = styled.td`
  border: solid 0.5px ${(props) => props.theme.borderLine};
  padding: 6px 12px;
  font-weight: 400;
`;

export const BlueBtn = styled(Btn)`
  background-color: #00aaff;
  white-space: nowrap;
  color: white;
`;

export const RedBtn = styled(Btn)`
  background-color: #e01414;
  white-space: nowrap;
  color: white;
`;

export const Overlay = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Modal = styled(motion.div).attrs({
  initial: { scale: 2 },
  animate: { scale: 1 },
})`
  width: 400px;
  margin: 40px;
  box-shadow: -2px 3px 3px rgba(0, 0, 0, 0.1), -5px 5px 10px rgba(0, 0, 0, 0.03);

  overflow: hidden;
  z-index: 20;
`;
