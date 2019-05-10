FROM node:9.11.2
RUN mkdir -p /code
WORKDIR /code

# Update all
RUN apt-get update && apt-get install -y autoconf \
    automake build-essential python-dev screen

# Get watchman
RUN cd /tmp/ \
    && git clone https://github.com/facebook/watchman.git watchman \
    && cd watchman \
    && git checkout v4.9.0 \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install
RUN cd / && rm -rf /tmp/watchman && watchman --version

# Get RN cli, CRNA, expo and AWS mobile cli
RUN npm i -g react-native-cli create-react-native-app exp awsmobile-cli

# Add user ec2-user, prefer not to use root
RUN useradd -m -u 500 -s /bin/bash ec2-user