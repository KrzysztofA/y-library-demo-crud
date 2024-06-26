using System.Net;

namespace Yasuzume.CrudApp.Controller;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route( "[controller]" )]
public class InventoryController : ControllerBase
{
  private readonly Library _library = new();

  [HttpGet]
  public async Task<List<string>> Get()
  {
    await _library.PullInventory();
    return _library.InventoryStrings.Select( t => string.Join( ", ", t ) ).ToList();
  }

  public class InventoryModel
  {
    public string isbn { get; set; }
    public string count { get; set; } = "0";
    public string formats { get; set; } = "000";
  }

  [HttpPost]
  public async Task<HttpResponseMessage> Post( [FromBody] InventoryModel model )
  {
    await _library.AddOrUpdateBookInventory( [model.isbn, "0", "000"] );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }
  [HttpPut]

  public async Task<HttpResponseMessage> Put( [FromBody] InventoryModel model )
  {
    await _library.AddOrUpdateBookInventory( [model.isbn, model.count, model.formats] );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }

  [HttpDelete]
  public async Task<HttpResponseMessage> Delete( [FromBody] InventoryModel model )
  {
    await _library.RemoveBookFromInventory( model.isbn );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }
}