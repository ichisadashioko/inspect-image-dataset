#!/usr/bin/env python3
# encoding=utf-8
import os
import argparse

import numpy as np
import cv2

if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    parser.add_argument('infile', type=str)

    args = parser.parse_args()

    print(args)
