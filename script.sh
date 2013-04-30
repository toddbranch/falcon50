#! /bin/bash

INPUT=$1
OUTPUT=$2

sed 's|"[^"]+"\t||' -r $INPUT > $OUTPUT
