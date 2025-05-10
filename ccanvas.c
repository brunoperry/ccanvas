#include <stdint.h>
#include <stddef.h>
#include <stdlib.h>

#define PIXEL_SIZE 4  // RGBA

static uint8_t* framebuffer = NULL;
static size_t width = 0;
static size_t height = 0;
static size_t buffer_size = 0;

// Set resolution and allocate framebuffer
void set_resolution(size_t w, size_t h) {
    width = w;
    height = h;
    buffer_size = width * height * PIXEL_SIZE;

    if (framebuffer) {
        free(framebuffer);
    }

    framebuffer = (uint8_t*) malloc(buffer_size);
}

// Fill buffer with a gradient
void fill_gradient() {
    if (!framebuffer) return;

    for (size_t y = 0; y < height; y++) {
        for (size_t x = 0; x < width; x++) {
            size_t index = (y * width + x) * PIXEL_SIZE;
            framebuffer[index + 0] = x % 256;    // R
            framebuffer[index + 1] = y % 256;    // G
            framebuffer[index + 2] = 128;       // B
            framebuffer[index + 3] = 255;       // A
        }
    }
}

// Get pointer to framebuffer
uint8_t* get_framebuffer_ptr() {
    return framebuffer;
}

// Get size of framebuffer
size_t get_framebuffer_size() {
    return buffer_size;
}