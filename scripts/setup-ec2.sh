#!/bin/bash

# EC2 인스턴스 초기 설정 스크립트
# 이 스크립트는 EC2 인스턴스에 SSH로 접속한 후 실행하세요

echo "=== EC2 Instance Setup for Docker Deployment ==="

# 시스템 업데이트
echo "Updating system packages..."
sudo yum update -y

# Docker 설치
echo "Installing Docker..."
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Docker Compose 설치
echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 애플리케이션 디렉토리 생성
echo "Creating application directory..."
mkdir -p ~/app
cd ~/app

# Docker 서비스 활성화
echo "Enabling Docker service..."
sudo systemctl enable docker

echo "=== Setup Complete! ==="
echo "Please log out and log back in for group changes to take effect"
echo "Then you can run: docker --version && docker-compose --version"
