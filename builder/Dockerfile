FROM swift:5.2-amazonlinux2

RUN yum -y update && yum -y install \
  zip

COPY build.sh /build.sh
WORKDIR /src
ENTRYPOINT ["/build.sh"]
