#!/bin/bash

NAME="unbgames"                              #Name of the application (*)
DJANGODIR=/usr/local/games/2017.1-PlataformaJogosUnB/backend            # Django project directory (*)
SOCKFILE=/usr/local/games/2017.1-PlataformaJogosUnB/backend/run/gunicorn.sock        # we will communicate using this unix socket (*)
USER=root                                        # the user to run as (*)
GROUP=root                                     # the group to run as (*)
NUM_WORKERS=5                                     # how many worker processes should Gunicorn spawn (*)
DJANGO_SETTINGS_MODULE=core.settings             # which settings file should Django use (*)
DJANGO_WSGI_MODULE=core.wsgi                     # WSGI module name (*)

echo "Starting $NAME as `whoami`"

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user $USER \
  --bind=unix:$SOCKFILE \
  --access-logfile /var/log/gunicorn/gunicorn-access.log \
  --error-logfile /var/log/gunicorn/gunicorn-error.log
