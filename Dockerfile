FROM php:7.4-apache

LABEL maintainer="Reuel Kandathil"

COPY app /srv/app

COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf
