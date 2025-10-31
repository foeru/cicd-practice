# Counter Application - Docker Compose 과제

React + Spring Boot + MySQL로 구성된 카운터 애플리케이션입니다.

## 프로젝트 구조

```
docker_assignment/
├── docker-compose.yml          # Docker Compose 설정
├── frontend/                   # React 프론트엔드
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   └── src/
├── backend/                    # Spring Boot 백엔드
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
└── README.md
```

## 기술 스택

- **Frontend**: React 18, Axios
- **Backend**: Spring Boot 3.2, Spring Data JPA
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose

## 주요 기능

- 카운터 증가/감소 버튼
- 카운터 리셋 기능
- 실시간 데이터 동기화 (MySQL에 저장)
- RESTful API

## 실행 방법

### 사전 요구사항
- Docker
- Docker Compose

### 실행

```bash
# 프로젝트 디렉토리로 이동
cd docker_assignment

# Docker Compose로 모든 서비스 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build
```

### 접속

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api/counter

### 종료

```bash
# 서비스 중지
docker-compose down

# 볼륨까지 삭제
docker-compose down -v
```

## API 엔드포인트

### 1. 카운터 조회
```
GET /api/counter
```

**응답 예시**:
```json
{
  "id": 1,
  "value": 5
}
```

### 2. 카운터 증가
```
POST /api/counter/increment
```

**응답 예시**:
```json
{
  "id": 1,
  "value": 6
}
```

### 3. 카운터 감소
```
POST /api/counter/decrement
```

**응답 예시**:
```json
{
  "id": 1,
  "value": 5
}
```

### 4. 카운터 리셋
```
POST /api/counter/reset
```

**응답 예시**:
```json
{
  "id": 1,
  "value": 0
}
```

## Docker Compose 서비스

### 1. db (MySQL)
- 이미지: `mysql:8.0`
- 포트: `3306:3306`
- 데이터베이스: `counterdb`
- 볼륨: 데이터 영구 저장

### 2. backend (Spring Boot)
- 빌드: `./backend/Dockerfile`
- 포트: `8080:8080`
- 의존성: db (MySQL이 준비된 후 시작)

### 3. frontend (React + Nginx)
- 빌드: `./frontend/Dockerfile`
- 포트: `80:80`
- 의존성: backend

## 개발 환경에서 실행

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## 트러블슈팅

### 포트 충돌
이미 사용 중인 포트가 있다면 `docker-compose.yml`에서 포트 번호를 변경하세요.

```yaml
frontend:
  ports:
    - "3000:80"  # 80번 대신 3000번 사용
```

### MySQL 연결 실패
MySQL 컨테이너가 완전히 시작될 때까지 기다립니다. healthcheck가 설정되어 있어 자동으로 대기합니다.

### 빌드 실패
```bash
# 캐시 없이 다시 빌드
docker-compose build --no-cache
docker-compose up
```

## 라이선스

MIT License
