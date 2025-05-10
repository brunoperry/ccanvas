# Makefile for building ccanvas.wasm with wasi-sdk

WASI_SDK_PATH ?= $(HOME)/wasi-sdk
CC = $(WASI_SDK_PATH)/bin/clang
CFLAGS = --target=wasm32-wasi -O2 -nostartfiles
LDFLAGS = -Wl,--no-entry -Wl,--export-memory \
          -Wl,--export=set_resolution \
          -Wl,--export=fill_gradient \
          -Wl,--export=get_framebuffer_ptr \
          -Wl,--export=get_framebuffer_size
SRC = ccanvas.c
OUT = ccanvas.wasm

all: $(OUT)

$(OUT): $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(OUT) $(LDFLAGS)

clean:
	rm -f $(OUT)

.PHONY: all clean