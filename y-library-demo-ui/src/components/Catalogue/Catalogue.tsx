import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Book from "../../lib/Book";
import BookField from "../BookField";

import { Flex, Spinner, Text } from "@chakra-ui/react";

/**
 * Load and display data from books with possibility to add accessible formats and the change number of available physical copies
 * @returns
 */
const Catalogue = () => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [unableToFetch, setUnableToFetch] = useState<boolean>(false);

  const handleFetch = useFetch("https://localhost:7133/", "database");

  useEffect(() => {
    if (unableToFetch || books != null) return;
    const fetchBooksData = async () => {
      const booksValues = await handleFetch()
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .catch((err) => {
          console.log(err);
          setUnableToFetch(() => true);
        });
      if (unableToFetch) return;
      setBooks(() =>
        booksValues.map((bookText: string) =>
          Book.CreateFromTableString(bookText)
        )
      );
    };
    fetchBooksData();
  }, [unableToFetch, books, handleFetch, setBooks, setUnableToFetch]);

  useEffect(() => {}, [books]);

  return (
    <Flex gap={30}>
      {unableToFetch ? (
        <Text color="red">
          Error connecting to the database, see console for more info.
        </Text>
      ) : books != null ? (
        books.map((book, index) => (
          <BookField key={`book${index}`} book={book} />
        ))
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};

export default Catalogue;
