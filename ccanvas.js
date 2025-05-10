const ccanvasTemplate = `
<canvas width="320" height="240"></canvas>
`;


class CCanvas extends HTMLElement {

    static observedAttributes=['width', 'height', 'background-color'];
    #canvas;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ccanvasTemplate;
        this.#canvas = this.shadowRoot.querySelector('canvas');

        this.#init();
    }

    async #init() {
        const response = await fetch('ccanvas.wasm');
        const bytes = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes, {});
      
        const { memory, fill_gradient, get_framebuffer_ptr, get_framebuffer_size, set_resolution} = instance.exports;
      

        const w = 320;
        const h = 240;

        this.width = 320;
        this.height = h;
        // Call C function to fill the buffer
        set_resolution(w, h);
        fill_gradient();
      
        const ptr = get_framebuffer_ptr();
        const size = get_framebuffer_size();
        const buffer = new Uint8ClampedArray(memory.buffer, ptr, size);
      
        const ctx = this.#canvas.getContext('2d');
        const imageData = new ImageData(buffer, this.width, this.height);
        ctx.putImageData(imageData, 0, 0);
    }

    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {

        switch (name) {
            case 'width':
                this.width = newValue;
                break;
            case 'height':
                this.height = newValue;
            break;
            case 'background-color':
                this.#canvas.style.backgroundColor = newValue;
                break;
            default:
                break;
        }
    }

    get width() {
        return this.#canvas.width;
    }
    set width(val) {
        this.#canvas.width = val;
    }
    get height() {
        return this.#canvas.height;
    }
    set height(val) {
        this.#canvas.height = val;
    }
}

customElements.define('c-canvas', CCanvas);