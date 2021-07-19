### Description
These are my dotfiles. I am using `stow` to manage them, so you could call them `stowfiles` lmao.

Much inspiration from https://github.com/ChristianChiarulli/Machfiles. Very wow.

### Installing
```bash
git clone git@github.com:tiannaru/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
./deploy.sh
```
The deploy script just does `stow */` and links my .gitconfig to your .gitconfig, so that you can run `git config --global` to you heart's content. Honestly, I'd rather move it to an Ansible role, but maybe later.

### Usage
`tmux`, `vim`, `nvim`, `i3` and other applications use this repository's config.

This is also nicely extensible. Many applications source config files from `~/.config/local_configs/`, so you can put more source controlled stuff in your source controlled stuff. For example, you can fork this public repo, on both your work and personal laptops, and then extend it with private dotfiles repo. All that these repos need is to keep config files in the `~/.config/local_configs/` folder.
Atm these files are used in the local_configs:
- config.local.fish
- init.local.vim
- kitty.local.conf
- tmux.local.conf


### Extra
Also my keyboard layout: https://configure.ergodox-ez.com/ergodox-ez/layouts/APZKR/latest
