import "./App.css";
import Catalogue from "./components/Catalogue";
import Inventory from "./components/Inventory";
import AddOrUpdateBook from "./components/AddOrUpdateBook";
import {
  Button,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import useAuthentication from "./hooks/useAuthentication";
import Login from "./components/Login/Login";
import AuthenticationContext from "./components/Context/AuthenticationContext";
import { useState } from "react";
import Register from "./components/Register/Register";

const App = () => {
  const { isAuthenticated, authenticate, logout } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  const logoutWithTabsChange = () => {
    logout();
    setTabIndex(() => 0);
  };

  return (
    <ChakraProvider>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, authenticate, logout: logoutWithTabsChange }}
      >
        {!isAuthenticated && (
          <Register isOpen={isRegisterOpen} onClose={onRegisterClose} />
        )}
        {!isAuthenticated && (
          <Login
            isOpen={isOpen}
            onClose={onClose}
            authenticate={authenticate}
          />
        )}
        <Tabs
          onChange={(index) => setTabIndex(index)}
          index={tabIndex}
          gap="10px"
        >
          <TabList>
            <Tab>Catalogue</Tab>
            {!isAuthenticated && (
              <Button
                onClick={() => onOpen()}
                variant={"link"}
                paddingLeft={10}
                paddingRight={5}
              >
                Login
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                onClick={() => onRegisterOpen()}
                variant={"link"}
                paddingInline={5}
              >
                Register
              </Button>
            )}
            {isAuthenticated && <Tab>Inventory</Tab>}
            {isAuthenticated && <Tab>Add/Update</Tab>}
            {isAuthenticated && (
              <Button onClick={() => logoutWithTabsChange()}>Logout</Button>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Catalogue />
            </TabPanel>
            <TabPanel>
              <Inventory />
            </TabPanel>
            <TabPanel>
              <AddOrUpdateBook />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AuthenticationContext.Provider>
    </ChakraProvider>
  );
};

export default App;
