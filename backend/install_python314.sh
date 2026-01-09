#!/bin/bash
# Installation script for Python 3.14 compatibility
# This sets the required environment variable to build pydantic-core

export PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
pip install --upgrade pip
pip install -r requirements.txt

