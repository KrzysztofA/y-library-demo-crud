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

const Login = ({
  isOpen,
  onClose,
  authenticate,
}: {
  isOpen: boolean;
  onClose: any;
  authenticate: any;
}) => {
  const handleUsernameChange = (e: any) => {
    console.log(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    console.log(e.target.value);
  };

  const login = (username: string, password: string) => {
    if (authenticate(username, password)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            onClick={() => login("admin", "admin")}
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
