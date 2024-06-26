import { FormEvent, useRef } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import { toTable } from "../../lib/TableUtils";

const BookForm = () => {
  const nameRef = useRef<string | null>(null);
  const authorRef = useRef<string | null>(null);
  const isbnRef = useRef<string | null>(null);
  const publisherRef = useRef<string | null>(null);
  const descriptionRef = useRef<string | null>(null);
  const dateRef = useRef<Date | null>(null);
  const coverImageURLRef = useRef<string | null>(null);
  const urlRef = useRef<string | null>(null);
  const languageRef = useRef<string | null>(null);

  const handleFetchUpdate = useFetch("https://localhost:7133/", "database");

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const day = dateRef.current?.getDay();
    const month = dateRef.current?.getMonth();
    const year = dateRef.current?.getFullYear();
    const queryObj = {
      isbn: toTable(`${isbnRef.current}`),
      name: toTable(`${nameRef.current}`),
      publisher: toTable(`${publisherRef.current}`),
      author: toTable(`${authorRef.current}`),
      description: toTable(`${descriptionRef.current}`),
      coverImageURL: toTable(`${coverImageURLRef.current}`),
      sourceURL: toTable(`${urlRef.current}`),
      language: toTable(`${languageRef.current}`),
      genres: `000000000000000`,
      dateOfPublication: `${month}-${day}-${year}`,
    };
    console.log(queryObj);
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
  // TODO
  return (
    <Card
      variant={"outline"}
      align={"center"}
      width={"fit-content"}
      margin={"auto"}
    >
      <CardHeader alignContent={"center"} fontWeight={700}>
        Add / Update Book
      </CardHeader>
      <CardBody>
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              onChange={(ev) => (nameRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input
              id="author"
              type="text"
              placeholder="Author's Name"
              onChange={(ev) => (authorRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="publisher">Publisher</FormLabel>
            <Input
              id="publisher"
              type="text"
              placeholder="Publisher's Name"
              onChange={(ev) => (publisherRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="isbn">
              ISBN <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              id="isbn"
              inputMode="text"
              type="text"
              maxLength={13}
              placeholder="ISBN Number"
              onChange={(ev) => (isbnRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Book's Description"
              onChange={(ev) => (descriptionRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
            <Input
              id="coverImage"
              type="url"
              placeholder="Cover Image URL"
              onChange={(ev) => (coverImageURLRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sourceUrl">Source URL</FormLabel>
            <Input
              id="sourceUrl"
              type="url"
              placeholder="Source Website URL"
              onChange={(ev) => (urlRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="languageUrl">Source URL</FormLabel>
            <Input
              id="languageUrl"
              type="text"
              placeholder="Book's Language"
              onChange={(ev) => (languageRef.current = ev.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pubDate">Date of Publication</FormLabel>
            <Input
              id="pubDate"
              type="datetime"
              onChange={(ev) =>
                (dateRef.current = new Date(`${ev.target.value}`))
              }
            />
          </FormControl>
          <br />
          <Button width={"md"} type="submit" title="Submit">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default BookForm;
