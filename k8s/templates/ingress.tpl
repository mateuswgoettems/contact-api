apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: $APP_NAME-ingress
  namespace: $APP_NAMESPACE
  annotations:
    kubernetes.io/ingress.class: 'nginx'
    cert-manager.io/cluster-issuer: letsencrypt
    kubernetes.io/tls-acme: "true"
spec:
  defaultBackend:
    service:
      name: $APP_NAME-svc
      port:
        number: $CONTAINER_PORT
  tls:
    - hosts:
        - $URL_TO_ASSUME
      secretName: $URL_TO_ASSUME
  rules:
    - host: $URL_TO_ASSUME
      http:
        paths:
          - path: /
            pathType: ImplementationSpecific
            backend:
              service:
                name: $APP_NAME-svc
                port:
                  number: $CONTAINER_PORT
