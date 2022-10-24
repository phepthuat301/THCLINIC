FROM mysql:5.7
COPY ./init/01.sql /docker-entrypoint-initdb.d/