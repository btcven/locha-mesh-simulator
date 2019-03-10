
CC = g++
CFLAGS = -I/usr/local/opt/openssl/include
LDFLAGS = -pthread  -L/usr/local/opt/openssl/lib
CXXFLAGS  = -Wall $(DEBUG) -std=c++11 -pthread
SRC_FILES = ${wildcard src/*.cpp}
APP_NAME = esp32-emulator


# make all
#
# Con debe detectar la plataforma en la que se ejecuta.
# Al menos windows, linux y macOS, en este caso 
# compila en macOS.
#
all: main.cpp
	@echo "Cleaning up..."
	rm -rf build/*
	@echo "Building...\n"
	${CC} -o build/${APP_NAME} main.cpp ${SRC_FILES} ${CFLAGS} ${LDFLAGS} -lcrypto -lssl -std=c++11

# También el comando clean debe ejecutarse 
# correctamente en cada plataforma.
# De hecho creo que la forma siguiente no es la correcta xD.
clean:
	@echo "Cleaning up..."
	rm -rf build/*.*
