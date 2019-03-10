/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */
#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include <thread>
#include <chrono>
#include <getopt.h>
#include <openssl/sha.h>
#include "include/routing.h"

using namespace std;

// definiciones de variables globales

std::string dBm;
std::string RSSI;
std::string SNR;

// clock since reset
clock_t start = clock();

static struct option long_options[] = {
    {"id", required_argument, 0, 'i'},
    {"dBm", required_argument, 0, 'd'},
    {0, 0, 0, 0},
};

char *header_crc(packet_header_t header)
{
    int size = sizeof(header); //get sizeof

    char *buff = new char[size];
    memset(buff, 0x00, size);
    memcpy(buff, &header, size);

    unsigned char digest[SHA256_DIGEST_LENGTH * 2 + 1];

    SHA256((unsigned char *)&buff, strlen(buff), (unsigned char *)&digest);

    char crc[SHA256_DIGEST_LENGTH];
    for (int i = 0; i < 16; i++)
    {
        sprintf(&crc[i * 2], "%02x", (unsigned int)digest[i]);

    }
    return crc;
}
ping_packet_t ping_to(char *to)
{
    ping_packet_t ping;
    ping.header.type = PING;
    ping.header.from = "me";
    ping.header.to = to;
    ping.header.time = time(NULL);
    ping.header.crc = header_crc(ping.header);
    return ping;
}

int main(int argc, char **argv)
{
    int c;
    int option_index = 0;
    c = getopt_long(argc, argv, "abc:d:f:", long_options, &option_index);

    //
    while (1)
    {
        std::this_thread::sleep_for(chrono::seconds(1));

        ping_packet_t ping = ping_to("A");

        //
        cout << ping.header.crc << "\n";
    }

    return 0;
};