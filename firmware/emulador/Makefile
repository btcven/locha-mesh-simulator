
CC = g++
CFLAGS = -I
CXXFLAGS  = -Wall $(DEBUG) -std=c++11 -pthread
LDFLAGS = -pthread
APP_NAME = esp32-emulator


pre: 
	mkdir build
	if(&)

# make all
all: main.cpp
	@echo "Cleaning up..."
	rm -rf build/*
	@echo "Building...\n"
	
	${CC} $(LDFLAGS) -o build/${APP_NAME} main.cpp -std=c++11

clean:
	@echo "Cleaning up..."
	rm -rf build/*.*
