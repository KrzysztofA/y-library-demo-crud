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

const App = () => {
  const { isAuthenticated, authenticate, logout } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Login isOpen={isOpen} onClose={onClose} authenticate={authenticate} />
        <Tabs onChange={(index) => setTabIndex(index)} index={tabIndex}>
          <TabList>
            <Tab>Catalogue</Tab>
            {!isAuthenticated && (
              <Button onClick={() => onOpen()}>Login</Button>
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
