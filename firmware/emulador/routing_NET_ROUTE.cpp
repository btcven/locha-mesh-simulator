/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */

#include <stdint.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string>
#include "include/stdafx.h"
#include "include/routing.h"

using namespace std;

extern std::string id_nodo;
extern packet_t Buffer_packet;
extern route_to_node_t routeTable[255];
extern neighbor_entry_t neighborTable[255];
extern int neighborEntry;
extern int routeEntry;

int routing_outcoming_NET_ROUTE(std::string  id_node, packet_t packet_received){

	return 0;
}

int routing_incoming_NET_ROUTE(std::string  id_node, packet_t packet_received){

	return 0;
}
