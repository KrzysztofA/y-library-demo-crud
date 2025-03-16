namespace Yasuzume.CrudApp.Controller;

using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route( "[controller]" )]
public class DatabaseController : ControllerBase
{
  private readonly Library _library = new();

  [HttpGet]
  [Route( "limited" )]
  public async Task<List<string>> GetLimited()
  {
    var books = await _library.GetISBNandNames();
    return books.Select( t => string.Join( ", ", t ) ).ToList();
  }

  [HttpGet]
  public async Task<List<string>> Get()
  {
    await _library.PullBooks();
    return _library.BookStrings.Select( t => string.Join( ", ", t ) ).ToList();
  }

  public class BookModel
  {
    public string isbn { get; set; }
    public string name { get; set; }
    public string author { get; set; }
    public string publisher { get; set; }
    public string description { get; set; }
    public string coverImageURL { get; set; }
    public string sourceURL { get; set; }
    public string language { get; set; }
    public string genres { get; set; }
    public string dateOfPublication { get; set; }
  }

  [HttpPut]
  public async Task<HttpResponseMessage> Put( [FromBody] BookModel model )
  {
    await _library.AddOrUpdateBookDatabase( [model.name, model.author, model.publisher, model.sourceURL, model.isbn, model.coverImageURL, model.description, model.language, model.dateOfPublication, model.genres] );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }
}