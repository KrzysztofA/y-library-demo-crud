import { createRef, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BookInventory from "../../lib/BookInventory";
import BookInventoryField from "../BookInventoryField";

import { Table, Button, Center, useDisclosure, Text } from "@chakra-ui/react";
import InventoryDrawer from "./InventoryDrawer";

const Inventory = () => {
  const [books, setBooks] = useState<BookInventory[] | null>(null);
  const [unableToFetch, setUnableToFetch] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { open, onOpen, onClose } = useDisclosure();
  const btnRef = createRef<HTMLButtonElement>();

  const handleFetch = useFetch("https://localhost:7133/", "inventory");

  const addBook = (book: BookInventory): boolean => {
    if (books?.findIndex((val) => val.getISBN() === book.getISBN()) !== -1)
      return false;
    if (books === null) {
      setBooks(() => [book]);
      return true;
    }
    setBooks((prevBooks: BookInventory[] | null) => {
      prevBooks?.push(book);
      return prevBooks;
    });
    return true;
  };

  const removeBook = (book: BookInventory): boolean => {
    if (
      books?.findIndex((val) => val.getISBN() === book.getISBN()) === -1 ||
      books === null
    )
      return false;
    setBooks((prevBooks: BookInventory[] | null) => {
      prevBooks =
        prevBooks?.filter((val) => val.getISBN() !== book.getISBN()) || null;
      return prevBooks;
    });
    return true;
  };

  useEffect(() => {
    if (isFetching || unableToFetch || books != null) return;
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
      setBooks(() =>
        booksValues.map((bookText: string) => {
          return BookInventory.CreateFromTableString(bookText);
        })
      );
      setIsFetching(() => false);
    };
    if (!isFetching) {
      fetchBooksData();
      setIsFetching(() => true);
    }
  }, [books, handleFetch, isFetching, unableToFetch]);

  useEffect(() => {}, [books]);

  return (
    <>
      {unableToFetch ? (
        <Text color="red">
          Error connecting to the database, check console for more info.
        </Text>
      ) : books != null ? (
        <Table.Root striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader scope="col">ISBN</Table.ColumnHeader>
              <Table.ColumnHeader scope="col">Name</Table.ColumnHeader>
              <Table.ColumnHeader scope="col">
                Available Count
              </Table.ColumnHeader>
              <Table.ColumnHeader scope="col">
                Available Formats
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {books?.map((book, index) => (
              <BookInventoryField
                key={"inventorybook" + index}
                book={book}
                removeBook={removeBook}
              />
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text fontSize={"lg"}>Nothing Here!</Text>
      )}
      <Center marginTop={10}>
        <Button
          colorScheme="yellow"
          size={"lg"}
          margin={"auto"}
          onClick={onOpen}
        >
          Add Book to Inventory
        </Button>
        <InventoryDrawer
          onClose={onClose}
          isOpen={open}
          btnRef={btnRef}
          addBook={addBook}
        />
      </Center>
    </>
  );
};

export default Inventory;
