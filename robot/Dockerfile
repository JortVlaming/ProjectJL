FROM python:2.7

WORKDIR /pynaoqi-server

# fix old Debian repos
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list \
 && sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list \
 && apt-get update \
 && apt-get install -y build-essential libglib2.0-0 libgl1-mesa-glx \
 && rm -rf /var/lib/apt/lists/*

# install pip + websocket server compatible with Python 2.7
RUN pip install --upgrade pip setuptools wheel \
 && pip install websocket-server==0.4.0

# copy NAOqi SDKs into image
COPY naoqi-sdk /opt/naoqi-sdk
COPY pynaoqi-sdk /opt/pynaoqi-sdk

# set environment variables inside container
ENV PYTHONPATH=/opt/pynaoqi-sdk/lib/python2.7/site-packages
ENV AL_DIR=/opt/naoqi-sdk
ENV AL_DIR_SIM=/opt/naoqi-sdk

# copy your server code
ARG CACHEBUST=1
COPY src /pynaoqi-server

EXPOSE 9000

# default command
CMD ["python", "main.py"]
