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

const App = () => {
  const { isAuthenticated, authenticate, logout } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Login isOpen={isOpen} onClose={onClose} authenticate={authenticate} />
      <Tabs>
        <TabList>
          <Tab>Catalogue</Tab>
          {!isAuthenticated && <Button onClick={() => onOpen()}>Login</Button>}
          {isAuthenticated && <Tab>Inventory</Tab>}
          {isAuthenticated && <Tab>Add/Update</Tab>}
          {isAuthenticated && <Button onClick={() => logout()}>Logout</Button>}
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
    </ChakraProvider>
  );
};

export default App;
