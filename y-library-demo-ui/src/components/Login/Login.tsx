import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";

const Login = ({
  isOpen,
  onClose,
  authenticate,
}: {
  isOpen: boolean;
  onClose: any;
  authenticate: any;
}) => {
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const handleUsernameChange = (e: any) => {
    usernameRef.current = e.target.value;
  };

  const handlePasswordChange = (e: any) => {
    passwordRef.current = e.target.value;
  };

  const login = async (username: string, password: string) => {
    if (await authenticate(username, password)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Username" onChange={handleUsernameChange} />
          <Input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => login(usernameRef.current, passwordRef.current)}
          >
            Login
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
