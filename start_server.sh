#!/bin/sh

pyexe=python

if [ -n "`command -v python2`" ]; then
    pyexe=python2
fi

$pyexe -m SimpleHTTPServer

