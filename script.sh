sudo docker exec ab0b4d7d975f /usr/bin/mysqldump --defaults-extra-file=/configdatabases/config.cnf test_nodejs > backup$(date +%s).sql
