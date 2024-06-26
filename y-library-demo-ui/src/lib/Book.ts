import { fromTable, fromTableURL } from "./TableUtils";

class Book {
  private author: string | null;
  private coverImageURL: string | null;
  private description: string | null;
  private isbn: string;
  private language: string | null;
  private title: string | null;
  private publicationDate: Date | null;
  private publisher: string | null;
  private url: string | null;

  constructor(
    isbn: string,
    author: string | null = null,
    coverImageURL: string | null = null,
    description: string | null = null,
    language: string | null = null,
    title: string | null = null,
    publicationDate: Date | null = null,
    publisher: string | null = null,
    url: string | null = null
  ) {
    this.isbn = isbn;
    this.author = author;
    this.coverImageURL = coverImageURL;
    this.description = description;
    this.language = language;
    this.title = title;
    this.publicationDate = publicationDate;
    this.publisher = publisher;
    this.url = url;
  }

  public getISBN(): string {
    return this.isbn;
  }

  public getAuthor(): string | null {
    return this.author;
  }

  public getCoverImageURL(): string | null {
    return this.coverImageURL;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public getLanguage(): string | null {
    return this.language;
  }

  public getTitle(): string | null {
    return this.title;
  }

  public getPublicationDate(): Date | null {
    return this.publicationDate;
  }

  public getPublisher(): string | null {
    return this.publisher;
  }

  public getURL(): string | null {
    return this.url;
  }

  public static CreateFromTableString(tableString: string): Book {
    const tableList = tableString.split(",");
    const tempTable = tableList[8].split("/");
    tableList[8] = `${tempTable[1]}/${tempTable[0]}/${tempTable[2]}`;
    return new Book(
      fromTable(tableList[4]),
      fromTableURL(tableList[1]),
      fromTable(tableList[5]),
      fromTable(tableList[6]),
      fromTable(tableList[7]),
      fromTable(tableList[0]),
      new Date(tableList[8]),
      fromTable(tableList[2]),
      fromTableURL(tableList[3])
    );
  }
}

export default Book;
