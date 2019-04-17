# Create RDS Postgres (free tier) instance

Note: DB_name, DB_user, DB_password, DB_url

# Setup EC2 instance

## Create free tier AWS EC2 Ubuntu 18 instance

Note: download keypair file, public-ec2-url, check inbound ssh port 22 rule, 

## ssh login to AWS instance

```
# Copy ec2 ssh keypair to ~/.ssh and set permissions
sudo mv ~/Downloads/keypair.pem ~/.ssh/
sudo chmod 400 ~/.ssh/keypair.pem

# remote ssh login to EC2 instance
ssh -i ~/.ssh/keypair.pem ubuntu@ec2-3-84-83-108.compute-1.amazonaws.com    # use default ubuntu user@public-ec2-url
```

## Install dev tools
```
sudo apt install -y curl git nodejs postgresql-client
```

## Clone repo, install and setup app
```
sudo mkdir /data
sudo chown -R ubuntu:ubuntu

git clone https://github.com/procoder-net/OutingEvents.git
cd OutingEvents

npm install

cat <<EOF >> server/variables.env
PGUSER=DB_user
PGHOST=DB_url
PGDATABASE=DB_name
PGPASSWORD=DB_password
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=mail_trap_user
MAIL_PASS=mail_trap_pass
OKTA_AUTH_ISSUER=https://<dev-account>.okta.com/oauth2/default
OKTA_AUTH_CLIENTID=<client-id>
EOF

```

## Start app (background)
```
nohup npm start &

tail -f nohup.out # watch app log file if needed
```
