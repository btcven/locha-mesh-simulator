/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */
#ifndef LORA_H
#define LORA_H

#define _CRT_NONSTDC_NO_DEPRECATE
#define _CRT_SECURE_NO_WARNINGS
#define _CRT_SECURE_NO_DEPRECATE
//------------------------------------------------------------------------------------------------
// Este archivo NO es para incluir en el ambiente real con ESP32, solo se usa para la simulacion
//------------------------------------------------------------------------------------------------
#include <stdint.h>
#include <iostream>
#include <cstdio>
#include <stdlib.h>
#include <cstdlib>
#include <string>

//#include "routing.h"
#include "simulacion.h"

extern std::string id_nodo;
extern packet_t Buffer_packet;
extern route_to_node_t routeTable[255];
extern neighbor_entry_t neighborTable[255];
extern int neighborEntry;
extern int routeEntry;
extern std::vector<std::string> split(std::string s, std::string delimiter);
extern packet_type_e convertir(std::string str);
extern packet_t buildpacket(uint8_t max_hops, std::string from, std::string to, uint8_t sequence[2], std::string payload, packet_type_e type, uint8_t packetLength);
extern int convert_msg_into_buffer(std::string msg_received, packet_t Buffer_packet);
extern int procesar_buffer(packet_t Buffer_packet, int neighborEntry, neighbor_entry_t neighborTable[255], int type_of_process);

// las siguientes variables NO se necesitan para arduino
extern std::string potencia;
extern std::string RSSI;
extern std::string SNR;
// fin de las variables no necesarias para arduino

// flag to indicate that a lora packet was received,LORA is half-duplex
volatile bool lora_receivedFlag = false;

// disable interrupt for lora when it's not needed
volatile bool lora_enableInterrupt = true;

extern std::string listado_nodos;
extern std::string listado_mensajes;

#define RAD_ENABLED true
#define RADIOTYPE "LORA"

int radio_isused()
{
  if (RAD_ENABLED)
  {
    if (RADIOTYPE == "LORA")
    {
      return lora_enableInterrupt;
    }
  }
  return 0;
}

void start_receive_lora_packets()
{
  // json
  // potencia del nodo (en metros) y la fecha/hora
  // dBm, RSSI, SNR
  std::string linkStatus;
  linkStatus.append("{");
  linkStatus.append("type: ");
  linkStatus.append("data: ");
  linkStatus.append("{");
  linkStatus.append("peer_id: " + id_nodo);
  linkStatus.append(", ");
  linkStatus.append("time: " + get_current_datetime());
  linkStatus.append(", ");
  linkStatus.append("dBm: " + potencia);
  linkStatus.append(", ");
  linkStatus.append("RSSI: " + RSSI);
  linkStatus.append(", ");
  linkStatus.append("SNR: ");
  linkStatus.append(SNR);
  linkStatus.append("}");

  // escribe_archivo(listado_nodos, mensaje);
}

int start_radio()
{

  int start_receive();
  if (RAD_ENABLED)
  {
    if (RADIOTYPE == "LORA")
    {
      start_receive_lora_packets();
      return 0;
    }
  }
  return 0;
}

void setFlag(void)
{
  // check if the interrupt is enabled
  if (!lora_enableInterrupt)
  {
    return;
  }

  // we got a packet, set the flag
  lora_receivedFlag = true;
}

int startup_lora()
{
  setFlag();
  start_receive_lora_packets();
  return 0;
}

int startup_radio()
{
  if (RAD_ENABLED)
  {
    if (RADIOTYPE == "LORA")
    {

      return startup_lora();
    }
  }
  return 0;
}

std::string converter(uint8_t str)
{
  return std::string(str, sizeof(str));
}

int trasmit_package_lora(packet_t mensaje)
{

  /*
  escribe_archivo(listado_mensajes, mensaje2);
  start_receive_lora_packets();
  */
  return 0;
}

int trasmit_package(packet_t mensaje)
{
  if (RAD_ENABLED)
  {
    if (RADIOTYPE == "LORA")
    {
      return trasmit_package_lora(mensaje);
    }
  }
  return 0;
}

int receive_package_lora()
{
  if (lora_receivedFlag)
  {

    lora_enableInterrupt = false;

    // se lee el mensaje del archivo texto

    std::string str = leer_archivo(listado_mensajes); // linea de text recibida del archivo
    std::vector<std::string> splitted;
    char *original;

    original = (char *)str.c_str();
    splitted = split(original, ",");
    if (splitted.size() > 0)
    {
      // se verifica que sea un paquete PARA este nodo
      if (splitted[4] == id_nodo)
      {
        // se borra el archivo porque ya se tomo el mensaje
        if (remove(listado_mensajes.c_str()) != 0)
        {
          std::cout << "No se pudo eliminar la cola de mensajes en el archivo ";
          std::cout << listado_mensajes;
        }
      }
      // se verifica si es un paquete HELLO para responderle al otro nodo

      std::string xx;
      xx = splitted[7];
      Buffer_packet.type = convertir(xx);
      if (splitted[7] == "HELLO")
      {
        // se responde con un ACK
        uint8_t sequence[2];
        sequence[0] = 1;
        sequence[1] = 1;
        packet_t respuesta = buildpacket(0, id_nodo, splitted[3], sequence, "ACK", PACKET_ACK, 0);
        int obtuve = trasmit_package(respuesta);
      }
      // packet was successfully received
      std::cout << "Received packet!";

      // print data of the packet
      std::cout << "Data:\t\t\t";
      std::cout << str;

      // print RSSI (Received Signal Strength Indicator)
      std::cout << "RSSI:\t\t\t";
      std::cout << "RSSI";
      std::cout << " dBm";

      // print SNR (Signal-to-Noise Ratio)
      std::cout << "SNR:\t\t\t";
      std::cout << "SNR";
      std::cout << " dB";

      // print frequency error
      std::cout << "Frequency error:\t";
      std::cout << "FREQ";
      std::cout << " Hz";

      // se coloca el packet recibido en el buffer
      int obtuve2 = convert_msg_into_buffer(str, Buffer_packet);
      int obtuve = procesar_buffer(Buffer_packet, neighborEntry, neighborTable, 0);

    } // fin del splitted.size()
    start_receive_lora_packets();
    lora_enableInterrupt = true;
    lora_receivedFlag = false;
  }
  return 0;
}

int receive_package()
{
  if (RAD_ENABLED)
  {
    if (RADIOTYPE == "LORA")
    {
      return receive_package_lora();
    }
  }
  return 0;
}

int hay_reciente(std::string file_name)
{
  // verifica si el archivo file_name esta vacio
  std::string xx = leer_archivo(file_name);
  if (xx != "")
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

int archivo_vacio(std::string file_name)
{
  // verifica si el archivo file_name esta vacio

  return 0;
}

void scan_lora(std::string id_node)
{
  // update lora neighbors
  // TODO
  // si no esta en uso se escanea buscando actividad en el canal
  if (hay_reciente(listado_mensajes))
  {
    setFlag();
  }
  if (lora_receivedFlag)
  {
    std::cout << "Scanning channel for LoRa preamble ... ";
    // se verifica en el archivo de nodos si hay algun nodo con fecha/hora reciente

    if (hay_reciente(listado_mensajes))
    {
      // LoRa preamble was detected
      std::cout << " detected preamble!";
      receive_package();

      // se envia un packet HELLO
      // en to y maxhops se coloca 0 porque es para cualquiera que lo reciba
      uint8_t sequence[2];
      sequence[0] = 1;
      sequence[1] = 1;
      packet_t respuesta = buildpacket(0, id_node, "0", sequence, "HELLO", PACKET_HELLO, 0);
      int obtuve = trasmit_package(respuesta);
    }
    else if (archivo_vacio(listado_nodos))
    {
      // no preamble was detected, channel is free
      std::cout << " channel is free!";
    }
  }
}

void scan_radio(std::string id_node)
{
  // update lora neighbors
  scan_lora(id_nodo);
}

#endif //LORA_H