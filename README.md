# **Gizmo Engine** _(wasm)_

![picture alt](https://raw.githubusercontent.com/brunoperry/ccanvas/refs/heads/main/resources/images/placeholder_readme.jpg "CCANVAS screenshot")

## About

3D software renderer written in C, compiled to wasm _(via wasi)_ and controlled by Javascript. Its an hobby project for learning purposes only.

## Features

- OBJ model loader _(mesh data only)_
- Z-buffering
- Flat shading _(directional lighting)_
- Wireframe, shaded and textured render modes

## Check it out

**[https://brunoperry.github.io/ccanvas/](https://brunoperry.github.io/ccanvas/ "https://brunoperry.github.io/ccanvas/")**

## Test it

Clone the repo and run index.html on localhost, no dependencies needed.

## Playing with different models

Open the `/resources/data.json` file and add/edit your new object _(name, url, texture)_. Also include/edit your new texture _(name, url)_.

Next, open the `script.js` file, change the Demo class to add your new model to the scene _(line 50)_.

## Bugs

A lot of them. The most noticable being:

- x clipping.
- Frame rate below 60.
- Camera not working properly.
- "Monkey Pressing" play/pause button messes with cursor lock _(UI)_.
- Occasional crash.
- ...

Have fun!
