vue-memory-game
==================
![][david-url]
![][license-url]

A tiny game written in `vue2`. It's inspired by IgorMinar's [Memory-Game](https://github.com/IgorMinar/Memory-Game). You can view the online demo [here](http://leftstick.github.io/vue-memory-game).

>If you are looking for `angular5` version, check it [here](https://github.com/leftstick/angular5-memory-game)

>If you are looking for `react` version, check it [here](https://github.com/leftstick/react-memory-game)

The online demo is implemented with extra rank system involved, you can check the source code at `stage-1` branch.

We choose `single-file-component` pattern as the fundamental of this game. In order to use this pattern, we involved [webpack](https://webpack.js.org/) with [vue-loader](https://github.com/vuejs/vue-loader) to make it possible.

## Components Tree ##

![](https://raw.githubusercontent.com/leftstick/vue-memory-game/master/docs/img/components.png)


## Components break down ##

1. `Game`, the whole game board
2. `Dashboard`, the panel on the top, including "logo", "progress", "best result"
3. `Logo`, on the left of `Dashboard`, showing the game Logo
4. `MatchInfo`, on the center of `Dashboard`, showing the current matching information
5. `Score`, on the right of `Dashboard`, showing the best result
6. `Chessboard`, on the center of `Game`, the playing area
7. `Card`, each card in the `Chessboard`
8. `PlayStatus`, the footer part, displaying current status of game

## File Structure ##

```
vue-memory-game
├── css
│   └── main.css
├── img
│   ├── ...
│   └── zeppelin.png
├── js
│   ├── components
│   │   ├── card
│   │   │   ├── Card.vue
│   │   │   └── Chessboard.vue
│   │   ├── dashboard
│   │   │   ├── Dashboard.vue
│   │   │   ├── Logo.vue
│   │   │   ├── MatchInfo.vue
│   │   │   └── Score.vue
│   │   ├── footer
│   │   │   └── PlayStatus.vue
│   │   │
│   │   └── Game.vue
│   │
│   ├── vuex
│   │   ├── actions
│   │   │   └── index.js
│   │   ├── getters
│   │   │   └── index.js
│   │   ├── mutations
│   │   │   └── index.js
│   │   └── store
│   │       ├── index.js
│   │       └── statusEnum.js
│   │
│   └── index.js
│
├── index.html_vm
├── package.json
├── webpack.config.js
└── webpack.config.prod.js
```

## Detail Explanation? ##

* [Chinese Edition](https://segmentfault.com/a/1190000005168085)


## Want Having a try locally? ##

```bash
#cloning code
git clone https://github.com/leftstick/vue-memory-game.git
cd vue-memory-game

#install dependencies
npm install
#start debug server
npm start
```

Now, view the demo at [http://localhost:8080](http://localhost:8080)


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/vue-memory-game/master/LICENSE)


[david-url]: https://david-dm.org/leftstick/vue-memory-game.png
[license-url]: https://img.shields.io/github/license/leftstick/vue-memory-game.svg
