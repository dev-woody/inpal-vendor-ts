import { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { Button } from "./buttonStyles";

type modalProps = {
  title: string;
  msg: string | JSX.Element;
  submitMsg?: string;
  cancelMsg?: string;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  action?: () => void;
};

const ModalBlock = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  ${(props: { modalVisible: boolean }) =>
    props.modalVisible &&
    css`
      display: flex;
    `}
`;

const ModalHeader = styled.div`
  box-sizing: border-box;
  margin: 0;
  color: #000;
  font-size: larger;
  font-weight: bold;

  & + * {
    margin-top: 0.75rem !important;
  }
`;

const ModalPage = styled.div`
  background-color: #fff;
  position: relative;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 20vw;
  min-height: 25vh;
`;

const ModalText = styled.div``;

const ModalFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 2rem 2rem;
`;

const Modal = ({
  title,
  msg,
  submitMsg,
  cancelMsg,
  modalVisible,
  setModalVisible,
  action,
}: modalProps) => {
  const onEnterPress = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setModalVisible(false);
      if (action) {
        action();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", onEnterPress);
    return () => {
      document.removeEventListener("keyup", onEnterPress);
    };
  }, [modalVisible]);

  return (
    <ModalBlock modalVisible={modalVisible}>
      <ModalPage>
        <ModalHeader>{title}</ModalHeader>
        <ModalText>{msg}</ModalText>
        <ModalFooter>
          <div>
            {submitMsg ? (
              <Button
                status="primary"
                onClick={() => {
                  setModalVisible(false);
                  if (action) {
                    action();
                  }
                }}
              >
                {submitMsg}
              </Button>
            ) : null}
            {cancelMsg ? <Button>{cancelMsg}</Button> : null}
          </div>
        </ModalFooter>
      </ModalPage>
    </ModalBlock>
  );
};

export default Modal;
