# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: $APP_NAME-svc
  namespace: $APP_NAMESPACE
spec:
  selector:
    app: $APP_NAME
  ports:
    - protocol: TCP
      port: $CONTAINER_PORT
      targetPort: $CONTAINER_PORT
  type: ClusterIP
