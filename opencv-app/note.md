# Windows

- Create a window with `cv2.namedWindow` function and the `cv2.WINDOW_NORMAL` flag will allow use to resize the window. However, the image is scaled with the window.
- We can attach callback function to handle events (e.g. `cv2.setMouseCallback`). However, if we close the window with the `X` button, the window events will be no longer passed to the callback function.
