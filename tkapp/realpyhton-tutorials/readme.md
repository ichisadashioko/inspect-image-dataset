<!-- https://realpython.com/python-gui-tkinter/ -->

# Python GUI Programming With Tkinter

Python has a lot of GUI frameworks, but Tkinter is the only framework that's built into the Python standard library. Tkinter has several strengths. It's cross-platform, so the same code works on Windows, macOS, and Linux. Visual elements are rendered using native operating system elements, so applications built with Tkinter look like they belong on the platform where they're run.

Although Tkinter is considered the de-facto Python GUI framework, it's not without critism. One notable criticism is that GUIs built with Tkinter look outdated. If you want a shiny, modern interface, then Tkinter may not be what you're looking for.

However, Tkinter is lightweight and relatively painless to use compared to other frameworks. This makes it a compelling choice for building GUI applications in Python, especially for applications where a modern sheen is unnecessary, and the top priority is to build something that's functional and cross-platform quickly.

__In this tutorial, you'll learn how to:__

- __Get started__ with Tkinter with a "Hello, World!" application
- __Work__ with widgets, such as buttons and text boxes
- __Control__ your application layout with geometry managers
- __Make__ your applications interactive by associating button clicks to Python functions

Once you're mastered these skills by working through the exercises at the end of each section, you'll tie everything together by building two applications. The first is
a temperature converter, and the second is a text editor. It's time to dive right in and see how to build an application with Tkinter!

# Building Your First Python GUI Application With Tkinter

The foundational element of a Tkinter GUI is the __window__. Windows are the containers in which all other GUI elements live. These other GUI elements, such as text boxes, labels, and buttons, are known as __widgets__. Widgets are contained inside of windows.

First, create a window that contains a single widget. Start up a new Python shell session and follow along!

With your Python shell open, the first thing you need to do is import the Python GUI Tkinter module:

```python
import tkinter as tk
```

A __window__ is an instance of Tkinter's `Tk` class. Go ahead and create a new window and assign it to the variable `window`:

```python
window = tk.Tk()
```

When you execute the above code, a new window pops up on your screen. How it looks depends on your operating system:

## Adding a Widget

Now that you have a window, you can add a widget. Use the `tk.Label` class to add some text to a window. Create a `Label` widget with the text `"Hello, Tkinter"` and assign it to a variable called `greeting`:

```python
greeting = tk.Label(text="Hello, Tkinter")
```

The window you created earlier doesn't change. You just created a `Label` widget, but you haven't added it to the window yet. There are several ways to add widgets to a window. Right now, you can use the `Label` widget's `.pack()` method:

```python
greeting.pack()
```

When you `.pack()` a widget into a window, Tkinter sizes the window as small as it can while still encompassing the widget. Now execute the following:

```python
window.mainloop()
```

Nothing seems to happen, but notice that a new prompt does not appear in the shell.

`window.mainloop()` tells Python to run the Tkinter __event loop__. This method listens for events such as button clicks or keypresses, and __blocks__ any code that comes after it from running until the window it's called on is closed. Go head and close the window you're created, and you'll see a new prompt displayed in the shell.

Creating a window with Tkinter only takes a couple of line of code. But blank windows aren't very useful! In the next section, you'll learn about some of the widgets available in Tkinter, and how you can customize them to meet your application's needs.

# Working With Widgets

Widgets are the bread and butter of the Python GUI framework Tkinter. They are the elements through which users interact with your program. Each __widget__ in Tkinter is defined by a class. Here are some of the widgets available:

| Widget Class | Description |
|--------------|-------------|
| `Label` | A widget used to display text on the screen |
| `Button` | A button that can contain text and can perform an action when clicked |
| `Entry` | A text entry widget that allows only a single line of text |
| `Text` | A text entry widget that allows multiline text entry |
| `Frame` | A rectangular region used to group related widgets or providing padding between widgets |
