#!/usr/bin/env bash

DIR="/usr/sbin/docker-compose"
if [[ ! -e $DIR ]]; then
  echo "Installing Docker..."
  sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg –dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo “deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu  $(lsb_release -cs) stable” | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  sudo groupadd docker
  sudo usermod -aG docker gabhenr

  # sudo yum install -y docker
  # sudo chkconfig docker on
  # sudo service docker start
  # sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
  # sudo chmod +x /usr/local/bin/docker-compose
  # sudo ln -s /usr/local/bin/docker-compose /usr/sbin/docker-compose
fi

# Database migration
#echo "Migrating Database..."

# Uncompress Dist
# cd /app/uiq/www/api/ && tar -xzvf dist.tar.gz

# Build Docker images
echo "Building Docker Images..."
cd ~/app/api
#echo "new path"
#echo pwd
./docker/production-build.sh

# Run containers for the first time
./docker/production-up.sh