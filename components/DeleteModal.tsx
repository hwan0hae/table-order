import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Box, Btn, RedBtn, Modal, Overlay, Row, Text } from "styles/styled";
import { DeleteModalData } from "types/data";
import { userDelete } from "utill/api";

export default function DeleteModal({ id, title }: DeleteModalData) {
  const ModalRef = useRef<HTMLDivElement>(null);
  const [onClicked, setOnClicked] = useState<boolean>(false);
  const userDeleteMutation = useMutation(
    "userDelete",
    (id: number) => userDelete(id),
    {
      onError: (data: any) => {
        alert(data.response?.data.message);
      },
      onSuccess: (data) => {
        alert(data.message);
      },
      onSettled: () => {
        setOnClicked(false);
      },
    }
  );
  const onDelete = () => {
    userDeleteMutation.mutate(id);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
        setOnClicked(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [ModalRef]);

  return (
    <>
      <RedBtn onClick={() => setOnClicked(true)} style={{ borderRadius: 15 }}>
        삭제
      </RedBtn>
      <AnimatePresence>
        {onClicked && (
          <Overlay>
            <Modal ref={ModalRef}>
              <Box>
                <Text>{title}를(을) 정말 삭제 하시겠습니까?</Text>
                <Row>
                  <RedBtn style={{ borderRadius: 0 }} onClick={onDelete}>
                    삭제
                  </RedBtn>
                  <Btn onClick={() => setOnClicked(false)}>취소</Btn>
                </Row>
              </Box>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
