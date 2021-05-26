// Use ES module import syntax to import functionality from the module
// that we have compiled.
//
// Note that the `default` import is an initialization function which
// will "boot" the module and make it ready to use. Currently browsers
// don't support natively imported WebAssembly as an ES module, but
// eventually the manual initialization won't be required!
import init,
{check_path, export_history, get_author, get_name, get_path, get_path_id,
 get_path_len, get_slug, import_history, jump, load_game, option_get_jump,
 option_get_text, path_get_option, path_get_option_len,
 path_get_text} from '../pkg/cyoa_crime_and_punishment.js';

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './assets/config/game.json',
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

const helpstr = `How To:
When confronted with an option, press the number that you want to select. Or, use a command.

Commands:
h/H/?: Shows this message
q/Q: Quits
p/P: Reprint the last message
g/G: Go to page (ie g 1)
s/S: Save the game into a string
i/I: Import a game from a string

Tips and Tricks:
Control + l: Clear
Enter with one option: autoselect option
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
    term.echo(get_name(game), {keepWords : true});
    term.echo(get_slug(game), {keepWords : true});
    term.echo(get_author(game), {keepWords : true});
    print_path();
  });
}

function parse_command(command) {
  var lower = command.name.toLowerCase();
  if (lower.startsWith("h") || lower.startsWith("?")) {
    term.echo(helpstr, {keepWords : true});
  } else if (lower.startsWith("q")) {
    term.echo("Just close the tab lol", {keepWords : true});
  } else if (isNumeric(lower)) {
    var selection = parseInt(lower) - 1;
    if ((selection < 0) || (selection >= path_get_option_len(get_path(game)))) {
      term.echo("Pick a proper number please", {keepWords : true});
    } else if (isNaN(selection)) {
      if (path_get_option_len(get_path(game)) == 1) {
        var jump_to = option_get_jump(path_get_option(get_path(game), 0));
        game = jump(game, jump_to);
        print_path();
      }
    } else {
      var jump_to = option_get_jump(path_get_option(get_path(game), selection));
      game = jump(game, jump_to);
      print_path();
    }
  } else if (lower.startsWith("g")) {
    var page = parseInt(command.args[0]);
    if ((page != null) && (isNumeric(page))) {
      page = parseInt(page);
      let length = get_path_len(game);
      if ((page >= 0) && (page < length)) {
        game = jump(game, parseInt(page));
        print_path();
      } else {
        term.echo("Enter a valid value (0-" + (length - 1) + ")",
                  {keepWords : true});
      }
    } else {
      term.echo("Enter a number after `g`", {keepWords : true});
    }
  } else if (lower.startsWith("p")) {
    print_path();
  } else if (lower.startsWith("s")) {
    term.echo(export_history(game), {keepWords : true});
  } else if (lower.startsWith("i")) {
    var history = parseInt(command.args[0]);
    if (history != null) {
      game = import_history(history);
    } else {
      term.echo("Enter a valid value (0-" + (length - 1) + ")",
                {keepWords : true});
    }
  } else {
    term.echo("Not an option. Try ? for help.", {keepWords : true});
  }
}

function print_path() {
  var current_path = get_path(game);
  term.echo("\n---\n\nPage " + get_path_id(game));
  term.echo(path_get_text(current_path), {keepWords : true});
  term.echo("\nOptions:");
  for (var n = 0; n < path_get_option_len(current_path); n++) {
    term.echo((n + 1) + ": " + path_get_option(current_path, n).text);
  }
}

run();
