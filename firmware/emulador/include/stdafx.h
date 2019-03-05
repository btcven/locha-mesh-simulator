/**
 * (c) Copyright 2019 locha.io project developers
 * Licensed under a MIT license, see LICENSE file in the root folder
 * for a full text.
 */

// stdafx.h: archivo de inclusi�n de los archivos de inclusi�n est�ndar del sistema
// o archivos de inclusi�n espec�ficos de un proyecto utilizados frecuentemente,
// pero rara vez modificados.

#ifndef STDAFX_H_
#define STDAFX_H_
#pragma once

// TODO: mencionar aqu� los encabezados adicionales que el programa necesita

// specific headers files for win32
#ifdef __WIN32
    #include "targetver.h"
    #include <stdio.h>
    #include <tchar.h>
#elif __APPLE__
// specific headers files for apple
    #include <stdio.h>
#elif __linux__
// specific headers files for linux
    #include <stdio.h>
#else
// unknow platform
#endif

#endif