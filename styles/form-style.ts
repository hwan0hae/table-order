import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  width: 350px;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 16px 0px;
  padding: 0 40px;
`;

export const InputContainer = styled.div`
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderLine};
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  position: relative;
`;
export const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  height: 30px;
  padding: 0 8px;
  border-radius: 3px;
`;
export const Preview = styled.img`
  width: 100%;
  padding: 16px 8px;
  max-height: 700px;
`;

export const SubmitBtn = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#FFFFE0" : "#FFD700")};

  color: black;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin-top: 15px;
  border-radius: 5px;
  font-weight: 500;

  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.2)")};
  }
  &:active {
    filter: ${(props) => (props.disabled ? "none" : "brightness(0.8)")};
  }
`;
export const ErrorText = styled.p`
  margin: 0;
  color: red;
  font-weight: 400;
`;
