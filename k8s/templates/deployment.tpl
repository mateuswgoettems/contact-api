apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME
  namespace: $APP_NAMESPACE
spec:
  replicas: 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: $APP_NAME
  template:
    metadata:
      labels:
        app: $APP_NAME
    spec:
      terminationGracePeriodSeconds: 60
      automountServiceAccountToken: false
      initContainers:
      - name: migrations-$APP_NAME
        image: $CONTAINER_IMAGE
        command: ["sh", "-c", "yarn migrate:prod --schema ./database/schema.prisma"]
        envFrom:
        - secretRef:
            name: $APP_NAME-secrets
        resources:
          limits:
            cpu: 128m
            memory: 256Mi
          requests:
            cpu: 128m
            memory: 256Mi
      containers:
      - name: $APP_NAME
        image: $CONTAINER_IMAGE
        ports:
        - containerPort: $CONTAINER_PORT
        envFrom:
        - secretRef:
            name: $APP_NAME-secrets
        resources:
          limits:
            cpu: 512m
            memory: 2048Mi
          requests:
            cpu: 128m
            memory: 256Mi
        imagePullPolicy: Always
        readinessProbe:
          httpGet:
            path: /healthz
            port: $CONTAINER_PORT
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /healthz
            port: $CONTAINER_PORT
          initialDelaySeconds: 15
          periodSeconds: 20
      imagePullSecrets:
      - name: docker-registry-ocir
