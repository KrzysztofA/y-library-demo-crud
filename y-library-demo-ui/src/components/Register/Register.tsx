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

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const handleUsernameChange = (e: any) => {
    usernameRef.current = e.target.value;
  };

  const handlePasswordChange = (e: any) => {
    passwordRef.current = e.target.value;
  };

  const register = (username: string, password: string) => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
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
            onClick={() => register(usernameRef.current, passwordRef.current)}
          >
            Register
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
