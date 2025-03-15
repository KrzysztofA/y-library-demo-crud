import { FormEvent, useRef } from "react";

import {
  Button,
  Input,
  Textarea,
  Card,
  Fieldset,
  Field,
} from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import { toTable } from "../../lib/TableUtils";
import AuthenticationContext from "@/Context/AuthenticationContext";

const BookForm = () => {
  const { isAuthenticated } = useConext(AuthenticationContext);

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
    if (!isAuthenticated) throw new Error("Not Authenticated");
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
    <Card.Root
      variant={"outline"}
      alignContent={"center"}
      width={"fit-content"}
      margin={"auto"}
    >
      <Card.Header alignContent={"center"} fontWeight={700}>
        Add / Update Book
      </Card.Header>
      <Card.Body>
        <form onSubmit={onSubmit}>
          <Fieldset.Root>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                onChange={(ev) => (nameRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Author</Field.Label>
              <Input
                id="author"
                type="text"
                placeholder="Author's Name"
                onChange={(ev) => (authorRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Publisher</Field.Label>
              <Input
                id="publisher"
                type="text"
                placeholder="Publisher's Name"
                onChange={(ev) => (publisherRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                ISBN <span style={{ color: "red" }}>*</span>
              </Field.Label>
              <Input
                id="isbn"
                inputMode="text"
                type="text"
                maxLength={13}
                placeholder="ISBN Number"
                onChange={(ev) => (isbnRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea
                id="description"
                placeholder="Book's Description"
                onChange={(ev) => (descriptionRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Cover Image</Field.Label>
              <Input
                id="coverImage"
                type="url"
                placeholder="Cover Image URL"
                onChange={(ev) => (coverImageURLRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Source URL</Field.Label>
              <Input
                id="sourceUrl"
                type="url"
                placeholder="Source Website URL"
                onChange={(ev) => (urlRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Source URL</Field.Label>
              <Input
                id="languageUrl"
                type="text"
                placeholder="Book's Language"
                onChange={(ev) => (languageRef.current = ev.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Date of Publication</Field.Label>
              <Input
                id="pubDate"
                type="datetime"
                onChange={(ev) =>
                  (dateRef.current = new Date(`${ev.target.value}`))
                }
              />
            </Field.Root>
            <br />
            <Button width={"md"} type="submit" title="Submit">
              Submit
            </Button>
          </Fieldset.Root>
        </form>
      </Card.Body>
    </Card.Root>
  );
};

export default BookForm;
function useConext(AuthenticationContext: any): { isAuthenticated: any } {
  throw new Error("Function not implemented.");
}
