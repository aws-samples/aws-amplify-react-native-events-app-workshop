FROM openjdk:8-jdk

ENV SDK_HOME=/sdk \
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8

WORKDIR $SDK_HOME

RUN apt-get --quiet update --yes \
  && apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1 git file build-essential ca-certificates openssh-server --no-install-recommends \
  && apt-get -q autoremove \
  && apt-get -q clean -y && rm -rf /var/lib/apt/lists/* && rm -f /var/cache/apt/*.bin

# configure JDK certs
RUN /var/lib/dpkg/info/ca-certificates-java.postinst configure \
# configure ssh server
  && sed -i 's|session    required     pam_loginuid.so|session    optional     pam_loginuid.so|g' /etc/pam.d/sshd \
  && mkdir -p /var/run/sshd

# Gradle
ENV GRADLE_VERSION 3.3
ENV GRADLE_SDK_URL https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip
RUN curl -sSL "${GRADLE_SDK_URL}" -o gradle-${GRADLE_VERSION}-bin.zip  \
  && unzip gradle-${GRADLE_VERSION}-bin.zip -d ${SDK_HOME}  \
  && rm -rf gradle-${GRADLE_VERSION}-bin.zip
ENV GRADLE_HOME ${SDK_HOME}/gradle-${GRADLE_VERSION}
ENV PATH ${GRADLE_HOME}/bin:$PATH

# android sdk|build-tools|image
ENV ANDROID_TARGET_SDK="android-23,android-25,android-26" \
  ANDROID_BUILD_TOOLS="build-tools-23.0.1,build-tools-25.0.2,build-tools-26.0.1" \
  ANDROID_SDK_TOOLS="25.2.3" \
  ANDROID_HOME=${SDK_HOME}/android-sdk-linux \
  PATH=${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools:$PATH:${ANDROID_HOME}/cmake/bin

RUN mkdir ${ANDROID_HOME} && wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/tools_r${ANDROID_SDK_TOOLS}-linux.zip \
  && unzip android-sdk.zip -d ${ANDROID_HOME}

# Android Cmake
RUN wget -q https://dl.google.com/android/repository/cmake-3.6.3155560-linux-x86_64.zip -O android-cmake.zip \
  && unzip -q android-cmake.zip -d ${ANDROID_HOME}/cmake \
  && chmod u+x ${ANDROID_HOME}/cmake/bin/ -R

# COPY package_file ${SDK_HOME}/

RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter "${ANDROID_TARGET_SDK}" \
  && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter platform-tools \
  && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter "${ANDROID_BUILD_TOOLS}" \
  && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-android-m2repository \
  && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-google_play_services \
  && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-m2repository
  # && echo y | android-sdk-linux/tools/bin/sdkmanager --package_file=package_file

#####################
#  Install node.js  #
#####################
# gpg keys listed at https://github.com/nodejs/node#release-team
# RUN set -ex \
#   && for key in \
#     9554F04D7259F04124DE6B476D5A82AC7E37093B \
#     94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#     FD3A5288F042B6850C66B31F09FE44734EB7990E \
#     71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
#     DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
#     B9AE9905FFD7803F25714661B63B535A4C206CA9 \
#     C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#     56730D5401028683275BD23C23EFEFE93C4CFFFE \
#   ; do \
#     gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
#     gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
#     gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
# done

RUN gpg --keyserver keyserver.ubuntu.com --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
&& gpg --keyserver keyserver.ubuntu.com --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9 \ 
&& gpg --keyserver keyserver.ubuntu.com --recv-keys 77984A986EBC2AA786BC0F66B01FBB92821C587A \
&& gpg --keyserver keyserver.ubuntu.com --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
&& gpg --keyserver keyserver.ubuntu.com --recv-keys FD3A5288F042B6850C66B31F09FE44734EB7990E \ 
&& gpg --keyserver keyserver.ubuntu.com --recv-keys 8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
&& gpg --keyserver keyserver.ubuntu.com --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
&& gpg --keyserver keyserver.ubuntu.com --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D



ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.5.0

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -SLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
&& ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENV YARN_VERSION 1.1.0

RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt/yarn \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/yarn --strip-components=1 \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg \
&& rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz

# Install global npm modules
RUN npm install -g react-native-cli exp@55.0.5