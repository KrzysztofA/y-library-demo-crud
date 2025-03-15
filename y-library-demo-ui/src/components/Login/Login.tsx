import { Button, Input, Dialog, Portal } from "@chakra-ui/react";
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

  const login = (username: string, password: string) => {
    if (authenticate(username, password)) {
      onClose();
    }
  };

  return (
    <Dialog.Root lazyMount open={isOpen} onClose={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Login</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input placeholder="Username" onChange={handleUsernameChange} />
              <Input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => login(usernameRef.current, passwordRef.current)}
              >
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Login;
