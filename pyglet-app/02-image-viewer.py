#!/usr/bin/env python3
# encoding=utf-8
import pyglet

window = pyglet.window.Window()
image = pyglet.resource.image('pyglet-logo.png')

@window.event
def on_draw():
    window.clear()
    image.blit(0, 0)

pyglet.app.run()
