
CC = gcc
CFLAGS = -I
STDFLAGS = c++11
IDIR = include
#LINC = ${IDIR}/*.h
SRCS = routing_NET
APP_NAME = esp32-emulator

# make all
all: main.cpp
	@echo "Cleaning up..."
	rm -rf build
	@echo "Building...\n"
	mkdir build
	## gcc -lpthread  -o firmware firmware.c base.c -lssl -lcrypto
	${CC} -Wall -lpthread -o ${APP_NAME} main.cpp -std=c++11

clean:
	@echo "Cleaning up..."
	rm -rf build/*.*
