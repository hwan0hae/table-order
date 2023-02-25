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
export const CompanyContainer = styled.div`
  margin-bottom: 12px;
`;
export const UserContainer = styled.div``;

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
export const TextArea = styled.textarea`
  padding: 6px 10px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderLine};
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 3px;
  height: 80px;
  margin-bottom: 8px;
`;
export const Preview = styled.img`
  width: 100%;
  padding: 16px 8px;
  max-height: 700px;
`;

export const SubmitBtn = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#FFFFE0" : "#FFD700")};
  color: black;
  display: flex;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.borderLine};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.3)")};
  }
  &:active {
    filter: ${(props) => (props.disabled ? "none" : "brightness(0.7)")};
  }
`;

export const EditSubmitBtn = styled(SubmitBtn)`
  white-space: nowrap;
  background-color: ${(props) => (props.disabled ? " #6690cc" : " #00aaff")};
  color: white;
  border-radius: 0;
  width: auto;
  height: auto;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: red;
  font-weight: 400;
`;

export const RadioText = styled.span`
  font-size: 1em;

  padding: 8px 16px;
  border-radius: 25px;
  border: none;
  box-shadow: 0px 0px 1px 1px ${(props) => props.theme.borderLine};
  color: ${(props) => props.theme.borderLine};
  display: flex;

  cursor: pointer;
`;

export const Radio = styled.input.attrs({ type: "radio" })`
  &:checked + ${RadioText} {
    font-weight: 400;
    background: ${(props) => props.theme.activeColor};
    color: ${(props) => props.theme.textColor};
  }
  display: none;
`;
