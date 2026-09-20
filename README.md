# Commitlint

This is a online commit message linting tool tailored for our team, inspired by [chiflix/commitlintio](https://github.com/chiflix/commitlintio).

[Click here](https://pomodorozhong.github.io/commitlint/) to see the tool.

## Installation

```sh
git clone https://github.com/pomodorozhong/commitlint
cd commitlint
npm install
```

## Build

To watch the chage of source code and automatically rebuild:

```sh
npm run dev
```

To build for once:

```sh
npm run build
```

## Install and use offline

When Commitlint is not installed, a dismissible install toast appears in the bottom-right corner.
The toast links to
[an introduction to progressive web apps on MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app).
Where the browser supports installation prompts, select **Install** on the toast to open the native
prompt. Otherwise, use the browser's **Install app / Add to Home screen** menu item. Dismissing the
toast hides automatic reminders permanently (until site data is cleared) in that browser profile;
use **Install & offline info** in the page footer to show the toast again. On iPhone or iPad, open
the site in Safari, tap **Share → Add to Home Screen**, then launch Commitlint from its home-screen
icon.

To test installation locally, run `npm run build` and then `npm run preview`, and open the local URL
shown by Vite. The PWA service worker is disabled in the development server, so use the production
preview for installation and offline checks.

Open the site online once and wait for **Offline support is ready on this device**. The editor, lint
rules, and saved history are then available offline on that device. The **Information** tab embeds a
Google Sheet and still needs an internet connection. Saved history is local and does not sync. On
some platforms, an installed home-screen app has separate storage from browser tabs, so messages
saved in one context may not appear in the other.

When an update is available, choose **Reload to update**. To regenerate the app icons after changing
`public/favicon.svg`, run:

```sh
npm run generate:pwa-assets
```
