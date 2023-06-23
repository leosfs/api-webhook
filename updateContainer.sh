#!/bin/bash

# Executa o comando e captura a saída
output=$(ls -l)

# Envia a saída como resposta
echo "$output"