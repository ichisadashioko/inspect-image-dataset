#!/usr/bin/env python3
# encoding=utf-8
import numpy as np
import cv2

# list all events name
# events = [i for i in dir(cv2) if 'EVENT' in i]
# print(events)

img = np.zeros((512, 512, 3), np.uint8)

# mouse callback function


def draw_circle(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(img, (x, y), 10, (255, 0, 0), -1)

# cv2.WINDOW_NORMAL does not keep our image aspect ratio
# cv2.namedWindow('image', cv2.WINDOW_NORMAL)
cv2.namedWindow('image')
cv2.setMouseCallback('image', draw_circle)

ESC_KEY = 27

while True:
    cv2.imshow('image', img)

    k = cv2.waitKey(20)

    # if not (k == -1):
    #     print('waitKey:', k)

    if (k & 0xff) == ESC_KEY:
        break

cv2.destroyAllWindows()
