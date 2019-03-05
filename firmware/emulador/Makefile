
# make all
all: main.cpp
	mkdir build
	# gcc -lpthread -lssl -lcrypto -o firmware firmware.c base.c
	gcc -lpthread -o esp32-emulator main.cpp -lssl -lcrypto -std=c++11

clean:
	rm -rf build 
