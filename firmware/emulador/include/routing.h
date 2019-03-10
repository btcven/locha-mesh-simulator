/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */

#ifndef ROUTING_H
#define ROUTING_H

#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <random>
#include <chrono>
#include <fstream>

typedef enum
{
    JOIN,
    PING,
    DATA,
} packet_type_e;

typedef struct
{
    packet_type_e type; // digested
    char *from;         // digested
    char *to;           // digested
    time_t time;        // digested
    char *crc;          // first 4 bytes of the digested
} packet_header_t;

typedef struct
{
    uint8_t max_hops;    // max_hops no entra en el calculo de hash.
    uint8_t sequence[2]; // por ejemplo {1, 2} representa parte 1 de 2 en total
    uint8_t length;      // longitud del mensaje.
    std::string payload; // es la secuencia del mensaje
    uint8_t msg_hash[4]; // first 4 bytes.
} data_packet_body_t;

typedef struct
{
    packet_header_t header;
} ping_packet_t;

typedef struct
{
    packet_header_t header;
    data_packet_body_t body;

} data_packet_t;

#endif // ROUTING_H