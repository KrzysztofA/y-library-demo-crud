import "./App.css";
import Catalogue from "./components/Catalogue";
import Inventory from "./components/Inventory";
import AddOrUpdateBook from "./components/AddOrUpdateBook";
import { Button, ChakraProvider, Tabs, useDisclosure } from "@chakra-ui/react";
import useAuthentication from "./hooks/useAuthentication";
import Login from "./components/Login/Login";
import AuthenticationContext from "./context/AuthenticationContext";
import { SetStateAction, useState } from "react";
import { Provider } from "./components/ui/provider";

const App = () => {
  const { isAuthenticated, authenticate, logout } = useAuthentication();
  const { open, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<string | null>("first");

  const logoutWithTabChange = () => {
    setValue(() => "first");
    logout();
  };

  return (
    <Provider>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, authenticate, logout: logoutWithTabChange }}
      >
        <Login isOpen={open} onClose={onClose} authenticate={authenticate} />
        <Tabs.Root value={value} onChange={(ev: any) => setValue(ev)}>
          <Tabs.List>
            <Tabs.Trigger>Catalogue</Tabs.Trigger>
            {!isAuthenticated && (
              <Button onClick={() => onOpen()}>Login</Button>
            )}
            {isAuthenticated && <Tabs.Trigger>Inventory</Tabs.Trigger>}
            {isAuthenticated && <Tabs.Trigger>Add/Update</Tabs.Trigger>}
            {isAuthenticated && (
              <Button onClick={() => logout()}>Logout</Button>
            )}
          </Tabs.List>
          <Tabs.Content>
            <Catalogue />
          </Tabs.Content>
          <Tabs.Content>
            <Inventory />
          </Tabs.Content>
          <Tabs.Content>
            <AddOrUpdateBook />
          </Tabs.Content>
        </Tabs.Root>
      </AuthenticationContext.Provider>
    </Provider>
  );
};

export default App;
