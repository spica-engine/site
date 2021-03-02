# TODO: Clear unnecessary installations
# This is our base image with all necessary tooling that we need to test and release spica
# Run    docker build .buildkite -t spicaengine/buildkite-node-with-mongodb:12      from the workspace root
# and publish the image by running    docker push spicaengine/buildkite-node-with-mongodb:12  
# Note that the number 12 ought to be sync with node's version to keep us beware which version of node we are testing against
FROM node:12

# Install essentials
RUN apt-get update && apt-get install apt-transport-https -y

# Install docker cli
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN echo "deb [arch=amd64] https://download.docker.com/linux/debian stretch stable" | tee /etc/apt/sources.list.d/docker-ce.list
RUN apt-get update && apt-get install docker-ce-cli -y
