/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */
#include <iostream>
#include <stdlib.h>
#include <thread>
#include <chrono>
#include <getopt.h>
#include "include/routing.h"

using namespace std;

// definiciones de variables globales

std::string dBm;
std::string RSSI;
std::string SNR;

packet_t Buffer_packet;
neighbor_entry_t neighborTable[255];
route_to_node_t routeTable[255];

// clock since reset
clock_t start = clock();

int neighborEntry = 0;
int routeEntry = 0;

std::string id_nodo;

static struct option long_options[] = {
    {"add", no_argument, 0, 'a'},
    {"append", no_argument, 0, 'b'},
    {"delete", required_argument, 0, 'd'},
    {"create", required_argument, 0, 'c'},
    {"file", required_argument, 0, 'f'},
    {0, 0, 0, 0},
};

//-------------------------------------------------------------------
// funciones necesarias para la simulacion, no requeridas en locha
//-------------------------------------------------------------------
char *random_id(size_t length)
{
    srand(time(NULL)); //generate a seed by using the current time

    char peer_id[length];

    peer_id[length] = '\0';

    size_t i = 0;

    int r;

    for (i = 0; i < length; ++i)
    {
        for (;;)
        {
            r = rand() % 57 + 65; //interval between 65 ('A') and 65+57=122 ('z')
            if ((r >= 65 && r <= 90) || (r >= 97 && r <= 122))
            {
                peer_id[i] = (char)r;
                break;
            }
        }
    }
    return peer_id;
}


int main(int argc, char **argv)
{
    int c;
    int option_index = 0;
    c = getopt_long (argc, argv, "abc:d:f:", long_options, &option_index);

    //
    while (1)
    {
        std::this_thread::sleep_for(chrono::seconds(1));
        cout << random_id(16) << "\n";
    }

    return 0;
};