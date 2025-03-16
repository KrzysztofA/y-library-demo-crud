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

  public class FullUser
  {
    public string Email { get; set; }
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
  [Route( "new" )]
  public async Task<HttpResponseMessage> AddUser( [FromBody] FullUser user )
  {
    await _library.AddUser( user.Email, user.Username, user.Password );
    return new HttpResponseMessage( HttpStatusCode.Accepted );
  }
}

