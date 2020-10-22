#!/usr/bin/env python3
# encoding=utf-8
import pyglet

window = pyglet.window.Window()


@window.event
def on_key_press(symbol, modifiers):
    print(symbol, modifiers)

    if symbol == pyglet.window.key.A:
        print('The "A" key was pressed.')
    elif symbol == pyglet.window.key.LEFT:
        print('The left arrow key was pressed.')
    elif symbol == pyglet.window.key.ENTER:
        print('The enter key was pressed.')


@window.event
def on_mouse_press(x, y, button, modifiers):
    print(x, y, button, modifiers)

    if button == pyglet.window.mouse.LEFT:
        print('The left mouse button was pressed.')


@window.event
def on_draw():
    window.clear()


# There are more than 20 event types that you can handle on a window. An
# easy way to find the event names and parameters you need is to add the
# following lines to your program:
event_logger = pyglet.window.event.WindowEventLogger()
window.push_handlers(event_logger)

pyglet.app.run()
