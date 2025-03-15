import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  NumberInput,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import BookInventory from "../../lib/BookInventory";

import Select from "react-select";
import { createRef, useRef } from "react";
import useFetch from "../../hooks/useFetch";

const BookInventoryField = ({
  book,
  removeBook,
}: {
  book: BookInventory;
  removeBook: any;
}) => {
  const optionsArr = [
    { value: 1, label: "Ebook" },
    { value: 2, label: "Hard Cover" },
    { value: 3, label: "Soft Cover" },
  ];

  const { open, onOpen, onClose } = useDisclosure();
  const cancelRef = createRef<HTMLButtonElement>();

  const formatsRef = useRef<({ value: number; label: string } | null)[]>(
    book
      .getFormats()
      .split("")
      .map((val, index) => {
        if (val === "0") return null;
        return optionsArr[parseInt(val) * index];
      })
      .filter((value) => value)
  );
  const countRef = useRef<number>(book.getCopies());

  const handleFetchUpdate = useFetch("https://localhost:7133/", "inventory");

  const updateBooks = () => {
    const queryObj = {
      isbn: book.getISBN().trim(),
      count: `${countRef.current}`,
      formats: `${
        formatsRef.current.findIndex((val) => val?.value === 1) !== -1
          ? "1"
          : "0"
      }${
        formatsRef.current.findIndex((val) => val?.value === 2) !== -1
          ? "1"
          : "0"
      }${
        formatsRef.current.findIndex((val) => val?.value === 3) !== -1
          ? "1"
          : "0"
      }`,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObj),
    };
    const updateBook = async () => {
      await handleFetchUpdate(undefined, options)
        .then((res) => {
          console.log(res);
          if (!res.ok) throw new Error(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    updateBook();
  };

  const handleFetchDelete = useFetch("https://localhost:7133/", "inventory");

  const deleteBook = () => {
    const queryObj = {
      isbn: book.getISBN().trim(),
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObj),
    };
    const deleteBookAsync = async () => {
      await handleFetchDelete(undefined, options)
        .then((res) => {
          console.log(res);
          if (!res.ok) throw new Error(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    deleteBookAsync();
  };

  return (
    <Tr>
      <Td>{book.getISBN()}</Td>
      <Td>{book.getTitle()}</Td>
      <Td>
        <NumberInput.Root
          defaultValue={countRef.current}
          min={0}
          onChange={(ev: any) => (countRef.current = parseInt(ev))}
        >
          <NumberInput.Label />
          <NumberInput.ValueText />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Td>
      <Td width={"20%"}>
        <Select
          isMulti
          defaultValue={book
            .getFormats()
            .split("")
            .map((val, index) => {
              if (val === "0") return null;
              return optionsArr[parseInt(val) * index];
            })
            .filter((value) => value)}
          options={optionsArr}
          onChange={(ev) => {
            formatsRef.current = [...ev];
          }}
        />
      </Td>
      <Td width={"5%"}>
        <Button
          size={"md"}
          colorScheme="blue"
          type="submit"
          onClick={updateBooks}
        >
          Update
        </Button>
      </Td>
      <Td width={"5%"}>
        <Button size={"md"} colorScheme="red" type="submit" onClick={onOpen}>
          Remove
        </Button>
        <AlertDialog
          isOpen={open}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Book from Inventory
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    if (removeBook(book)) deleteBook();
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Tr>
  );
};

export default BookInventoryField;
