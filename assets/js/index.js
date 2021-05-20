// Use ES module import syntax to import functionality from the module
// that we have compiled.
//
// Note that the `default` import is an initialization function which
// will "boot" the module and make it ready to use. Currently browsers
// don't support natively imported WebAssembly as an ES module, but
// eventually the manual initialization won't be required!
import init,
{check_path, get_author, get_name, get_path, get_path_id, get_slug, jump,
 load_game, option_get_jump, option_get_text, path_get_option,
 path_get_option_len, path_get_text} from '/pkg/cyoa_CaP.js';

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '/assets/config/game.json',
            true); // Replace 'appDataServices' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value
      // but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function isNumeric(num) { return !isNaN(num) }

const helpstr = `Help:
h/H/?: Shows this message
q/Q: Quits
p/P: Reprint the last message
g/G: Go to page (ie g 1)
`;

var game;
var term;

async function run() {
  await init();
  term = $('body').terminal(function(command) {
    var cmd = $.terminal.parse_command(command);
    parse_command(cmd);
  }, {greetings : ""});
  term.echo("Loading...");

  loadJSON(function(response) {
    game = load_game(response);
    document.title = get_name(game);
    term.remove_line(-1);
    term.echo(get_name(game));
    term.echo(get_slug(game));
    term.echo("Made by " + get_author(game) + "\n");
    print_path();
  });
}

function parse_command(command) {
  var lower = command.name.toLowerCase();
  if (lower.startsWith("h") || lower.startsWith("?")) {
    term.echo(helpstr);
  } else if (lower.startsWith("q")) {
    term.echo("Just close the tab lol");
  } else if (isNumeric(lower)) {
    var selection = parseInt(lower) - 1;
    if ((selection < 0) || (selection >= path_get_option_len(get_path(game)))) {
      term.echo("Pick a proper number please");
    } else {
      var jump_to = option_get_jump(path_get_option(get_path(game), selection));
      game = jump(game, parseInt(lower));
      print_path();
    }
  } else if (lower.startsWith("g")) {
    var page = parseInt(command.args[0]);
    if ((page != null) && (isNumeric(page))) {
      page = parseInt(page);
      if ((page >= 0)) {
        game = jump(game, parseInt(page));
      } else {
        term.echo(
            "Enter a valid value (0-however-long-this-is-but-it-will-crash-if-the-number-doesnt-exist)");
      }
      print_path();
    } else {
      term.echo("Enter a number after `g`");
    }
  } else if (lower.startsWith("p")) {
    print_path();
  } else {
    term.echo("Not an option. Try ? for help.");
  }
}

function print_path() {
  var current_path = get_path(game);
  term.echo("Page " + get_path_id(game) + ": " + path_get_text(current_path));
  term.echo("\nOptions:");
  for (var n = 0; n < path_get_option_len(current_path); n++) {
    term.echo((n + 1) + ": " + path_get_option(current_path, n).text);
  }
  term.echo("What do you do?")
}

run();
