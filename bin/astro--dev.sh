#!/bin/sh
until ./bin/astro--dev--run.sh; do
  echo "dev crashed with exit code $?.  Respawning.." >&2
  sleep 1
done
