namespace Yasuzume.CrudApp;

using DotNetEnv;
using Npgsql;
using System.Collections.Generic;

public class Library
{
  public List<List<string>> BookStrings { get; private set; } = new();
  public List<List<string>> InventoryStrings { get; private set; } = new();

  public Library()
  {

  }

  public async Task<bool> PullBooks()
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    // Select * from Books For JSON, create books list from JSON
    await using var cmd = new NpgsqlCommand("SELECT * FROM \"public\".\"Books\";", connection);
    await using var reader = await cmd.ExecuteReaderAsync();
    while ( reader.Read() )
    {
      var tempRow = new List<string>();
      for ( var i = 0; i < 10; i++ ) tempRow.Add( i == 8 ? $"{reader.GetDateTime( i ).ToShortDateString()}" : $"{reader.GetString( i ).Replace( ",", "%2C" )}" );
      BookStrings.Add( tempRow );
    }
    await reader.CloseAsync();
    return true;
  }

  public async Task<bool> RemoveBookFromInventory( string isbn )
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    // Select * from Books For JSON, create books list from JSON
    var commandString = $"DELETE FROM \"public\".\"Inventory\" WHERE \"ISBN\" = '{isbn}';";
    await using var cmd = new NpgsqlCommand(commandString, connection).ExecuteReader();

    return true;
  }

  public async Task<List<List<string>>> GetISBNandNames()
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    // Select * from Books For JSON, create books list from JSON
    await using var cmd = new NpgsqlCommand("SELECT \"public\".\"Books\".\"ISBN\", \"public\".\"Books\".\"Name\" FROM \"public\".\"Books\";", connection);
    await using var reader = await cmd.ExecuteReaderAsync();

    var books = new List<List<string>>();
    while ( reader.Read() )
    {
      var tempRow = new List<string>();
      for ( var i = 0; i < 2; i++ ) tempRow.Add( $"{reader.GetString( i ).Replace( ",", "%2C" )}" );
      books.Add( tempRow );
    }
    await reader.CloseAsync();
    return books;
  }

  public async Task<bool> PullInventory()
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    // Select * from Books For JSON, create books list from JSON
    await using var cmd = new NpgsqlCommand("SELECT \"public\".\"Inventory\".\"AvailableCopies\", \"public\".\"Inventory\".\"AvailableFormats\", \"public\".\"Inventory\".\"ISBN\", \"public\".\"Books\".\"Name\" FROM \"public\".\"Inventory\" INNER JOIN \"public\".\"Books\" USING(\"ISBN\");", connection);
    await using var reader = await cmd.ExecuteReaderAsync();
    while ( reader.Read() )
    {
      var tempRow = new List<string>();
      for ( var i = 0; i < 4; i++ ) tempRow.Add( i == 0 ? $"{reader.GetInt32( i )}" : $"{reader.GetString( i ).Replace( ",", "%2C" )}" );
      InventoryStrings.Add( tempRow );
    }
    await reader.CloseAsync();
    return true;
  }

  public async Task<bool> AddOrUpdateBookInventory( List<string> book )
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    await using var cmd =
      new NpgsqlCommand($"INSERT INTO \"public\".\"Inventory\" ( \"ISBN\", \"AvailableCopies\", \"AvailableFormats\" ) VALUES ( '{book[0]}', '{book[1]}', '{book[2]}' ) ON CONFLICT (\"ISBN\") DO UPDATE SET \"AvailableCopies\" = EXCLUDED.\"AvailableCopies\", \"AvailableFormats\" = EXCLUDED.\"AvailableFormats\";", connection).ExecuteReader();
    return true;
  }
  public async Task<bool> AddOrUpdateBookDatabase( List<string> book )
  {
    Env.Load();
    var connectionString = $"Host={Environment.GetEnvironmentVariable("DATABASE_HOST")};Username={Environment.GetEnvironmentVariable("USERNAME")};Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")};Database=LibraryDatabase";
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using var connection = await dataSource.OpenConnectionAsync();

    await using var cmd =
      new NpgsqlCommand($"INSERT INTO \"public\".\"Books\" ( \"Name\", \"Author\", \"Publisher\", \"URL\", \"ISBN\", \"CoverImageURL\", \"Description\", \"Language\", \"PublicationDate\", \"Genres\") \r\nVALUES ( '{book[0]}', '{book[1]}', '{book[2]}', '{book[3]}', '{book[4]}', '{book[5]}', '{book[6]}', '{book[7]}', '{book[8]}', '{book[9]}' ) ON CONFLICT (\"ISBN\") DO UPDATE SET \"Name\" = Excluded.\"Name\", \"Author\" = Excluded.\"Author\", \"Publisher\" = Excluded.\"Publisher\", \"URL\" = Excluded.\"URL\", \"CoverImageURL\" = Excluded.\"CoverImageURL\", \"Description\" = Excluded.\"Description\", \"Language\" = Excluded.\"Language\", \"PublicationDate\" = Excluded.\"PublicationDate\", \"Genres\" = Excluded.\"Genres\";", connection).ExecuteReader();
    return true;
  }

}
