$ErrorActionPreference = "Stop"

[pscustomobject]@{
  CreateInstance = "aws rds create-db-instance --db-instance-identifier study-rds-db --engine mysql --engine-version 8.0.35 --db-instance-class db.t4g.micro --allocated-storage 20 --master-username studyadmin --master-user-password <secure-password> --db-name studyapp --db-subnet-group-name study-rds-subnet-group --vpc-security-group-ids study-rds-sg --port 3306 --backup-retention-period 7"
  DescribeInstance = "aws rds describe-db-instances --db-instance-identifier study-rds-db"
  WaitAvailable = "aws rds wait db-instance-available --db-instance-identifier study-rds-db"
  ConnectMysql = "mysql -h <rds-endpoint> -P 3306 -u studyadmin -p studyapp"
  DeleteInstance = "aws rds delete-db-instance --db-instance-identifier study-rds-db --skip-final-snapshot"
}
