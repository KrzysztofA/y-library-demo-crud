using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Yasuzume.CrudApp.Controller;

[ApiController]
[Route( "[controller]" )]
public class UserController : ControllerBase
{
  private readonly Library _library = new();

  public class User
  {
    public string Username { get; set; }
    public string Password { get; set; }
  }

  [HttpPost]
  public async Task<HttpResponseMessage> LoginUser( [FromBody] User user )
  {
    var accepted = await _library.CheckUserPassword( user.Username, user.Password );
    return accepted ? new HttpResponseMessage( HttpStatusCode.Accepted ) : new HttpResponseMessage( HttpStatusCode.NotFound );
  }

  [HttpPost]
  public async Task<HttpResponseMessage> AddUser( [FromBody] User user )
  {
    await _library.AddUser( user.Username, user.Password );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }
}

