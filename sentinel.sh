git pull https://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@github.com/biges/sentinel-petronet-frontend.git
# docker rm -v sentinel-petronet-frontend-container
# docker build -t sentinel-petronet-frontend .
# docker run -d -p 8080:80 --name sentinel-petronet-frontend-container sentinel-petronet-frontend
# git pull https://2RPWTRC9EZXfRPYXsNbYqEArmo0TM/S6CeC0RkO3jcM@github.com/biges/sentinel-petronet-frontend.git
#docker rm -f $(docker ps -a --filter name=sentinel-petronet-frontend-container)
docker rm -v -f sentinel-petronet-frontend-container
docker build -t sentinel-petronet-frontend .
docker run -d -p 8080:80 --name sentinel-petronet-frontend-container sentinel-petronet-frontend