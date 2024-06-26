import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@chakra-ui/react";
import Book from "../../lib/Book";
import styles from "./BookField.module.scss";

const BookField = ({ book }: { book: Book }) => {
  return (
    <Card
      direction={{ base: "column", sm: "column" }}
      variant="outline"
      maxW={"sm"}
      colorScheme="green"
    >
      <CardHeader>
        <div className={styles.title}>{book.getTitle()}</div>
        <div className={styles.title}>{book.getPublisher()}</div>
      </CardHeader>
      <a href={`${book.getURL()}`} target="_blank" rel="noreferrer">
        <Image
          objectFit={"cover"}
          margin={"auto"}
          src={`${book.getCoverImageURL()}`}
          alt={`${book.getTitle()} Cover`}
        />
      </a>
      <CardBody className={`${styles.description}`}>
        {book.getDescription()}
      </CardBody>
      <CardFooter>
        <div>{`${book.getISBN()} (${book
          .getPublicationDate()
          ?.getMonth()}/${book.getPublicationDate()?.getFullYear()}) (${book
          .getLanguage()
          ?.trim()})`}</div>
      </CardFooter>
    </Card>
  );
};

export default BookField;
