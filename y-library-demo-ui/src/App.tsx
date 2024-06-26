import "./App.css";
import Catalogue from "./components/Catalogue";
import Inventory from "./components/Inventory";
import AddOrUpdateBook from "./components/AddOrUpdateBook";
import {
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Tabs>
        <TabList>
          <Tab>Catalogue</Tab>
          <Tab>Inventory</Tab>
          <Tab>Add/Update</Tab>
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
