# Variables
IMAGE_NAME := pokerand
DOCKERFILE := Dockerfile

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE) .

# Clean up the Docker image
clean:
	docker rmi $(IMAGE_NAME)
