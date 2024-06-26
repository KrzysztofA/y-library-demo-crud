import { fromTableURL } from "./TableUtils";

class BookInventory {
  private isbn: string;
  private title: string;
  private copies: number;
  private availableFormats: string;

  constructor(
    isbn: string,
    copies: number = 0,
    title: string = "",
    formats: string = "000"
  ) {
    this.isbn = isbn;
    this.copies = copies;
    this.availableFormats = formats;
    this.title = fromTableURL(title);
  }

  public getISBN(): string {
    return this.isbn;
  }

  public getCopies() {
    return this.copies;
  }

  public getFormats() {
    return this.availableFormats;
  }

  public getTitle() {
    return this.title;
  }

  public setCopies(copies: number) {
    this.copies = Math.max(0, copies);
  }

  public static CreateFromTableString(tableString: string): BookInventory {
    const tableList = tableString.split(",").map((val) => val.trim());
    return new BookInventory(
      tableList[2],
      parseInt(tableList[0]),
      tableList[3],
      tableList[1]
    );
  }
}

export default BookInventory;
