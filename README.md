# Choose Your Own Adventure: Crime and Punishment

A WASM-based game written in Rust for the novel Crime and Punishment by Fyodor Dostoevsky.

## Building / Deploying

You need [Rustup, Rust, cargo](https://rustup.rs/), and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/). Run the `build.sh` script and copy over the `assets` folder and the `index.html` file to a webroot to serve. If you want, you can remove some generated files, such as `assets/pkg/{LICENSE,package.json,README.md}`, since they aren't strictly required.

## Credits

This program was made by Sambhav Saggi for my English class. I used the following libraries:

- [cyoa-rs](https://github.com/sambhavsaggi/cyoa-rs) for the actual library to manage the game (made by me for this purpose).
- [wasm-pack and co](https://rustwasm.github.io/) for the WebAssembly interface.
- [jQuery Terminal](https://terminal.jcubic.pl/) for rendering the actual game in a TUI format.
- [jQuery](https://jquery.com/) because it seems like everything needs jQuery these days ;-;.
- [Misc Rust libraries](https://github.com/sambhavsaggi/cyoa-crime-and-punishment/blob/master/Cargo.toml#L12) that are too numerous to list here.

I used a copy of *Crime and Punishment* that was translated by Constance Garnett [available on Gutenberg](Constance Garnett) as my reference to build this game on (and in some cases just copy paste the text).
