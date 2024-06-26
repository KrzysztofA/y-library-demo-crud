import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { fromTableURL } from "../../lib/TableUtils";
import BookInventory from "../../lib/BookInventory";

const InventoryDrawer = ({
  btnRef,
  isOpen,
  onClose,
  addBook,
}: {
  btnRef: any;
  isOpen: any;
  onClose: any;
  addBook: any;
}) => {
  const [availableBooks, setAvailableBooks] = useState<
    | {
        isbn: string;
        name: string;
      }[]
    | null
  >(null);

  const [unableToFetch, setUnableToFetch] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleFetch = useFetch("https://localhost:7133/", "database/limited");
  const handlePost = useFetch("https://localhost:7133/", "inventory");

  const postBook = (isbn: string) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn: isbn }),
    };
    const addBook = async () => {
      await handlePost(undefined, options)
        .then((res) => {
          console.log(res);
          if (!res.ok) throw new Error(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    addBook();
  };

  useEffect(() => {
    if (!isOpen || availableBooks !== null) return;

    const fetchBooksData = async () => {
      const booksValues = await handleFetch()
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .catch((err) => {
          setUnableToFetch(() => true);
        });
      if (unableToFetch) {
        setIsFetching(() => false);
        return;
      }
      setAvailableBooks(() =>
        booksValues.map((bookText: string) => {
          const tableList = bookText.split(",").map((val) => val.trim());
          return { isbn: tableList[0], name: fromTableURL(tableList[1]) };
        })
      );
      setIsFetching(() => false);
    };
    if (!isFetching) {
      fetchBooksData();
      setIsFetching(() => true);
    }
  }, [availableBooks, handleFetch, isFetching, isOpen, unableToFetch]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Select book from available ISBN (and/or titles)
        </DrawerHeader>

        <DrawerBody>
          <Flex flexDir={"column"}>
            {availableBooks !== null ? (
              availableBooks?.map((book: { isbn: string; name: string }) => {
                return (
                  <Button
                    key={`${book.isbn}button`}
                    justifyContent={"stretch"}
                    fontSize={"0.6rem"}
                    onClick={() => {
                      if (
                        addBook(
                          new BookInventory(book.isbn, 0, book.name, "000")
                        )
                      )
                        postBook(book.isbn);
                    }}
                  >
                    <span style={{ textAlign: "left" }}>{book.isbn}</span>
                    <span style={{ textAlign: "center", margin: "auto" }}>
                      -
                    </span>
                    <span style={{ textAlign: "right" }}>{book.name}</span>
                  </Button>
                );
              })
            ) : (
              <Text color="red">No books Available</Text>
            )}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InventoryDrawer;
