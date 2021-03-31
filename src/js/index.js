import '/scss/main.scss';
window.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
})

let segmentSize = document.getElementById('segmentSize');
let sizeValue = document.getElementById('sizeValue');
let segmentNumber = document.getElementById('segmentNumber');
let numberValue = document.getElementById('numberValue');
let segmentCompression = document.getElementById('segmentCompression');
let compressionValue = document.getElementById('compressionValue');


let s1 = Number(segmentSize.value).toFixed(2);
let s2 = Number(segmentNumber.value).toFixed(2);
let s3 = Number(segmentCompression.value).toFixed(2);

segmentSize.addEventListener('change', () => {
    sizeValue.innerHTML = segmentSize.value;
    s1 = Number(segmentSize.value).toFixed(2);
    const frag2 = `
        #ifdef GL_ES
        precision highp float;
        #endif

        #define SEGMENTS 32.0
        #define PI 3.141592653589

        uniform float u_time;
        uniform vec2 resolution;
        uniform vec2 mouse;

        uniform sampler2D image;
        varying vec2 v_texcoord;

        void main(void)
        {
            vec2 uv = v_texcoord;
            uv *= 2.0;
            uv -= 1.0;
            
            // get the angle and radius
            float radius = length(uv);
            float angle = atan(uv.y, uv.x);
            
            //get segment
            angle /= PI * ${s1};
            angle *= SEGMENTS + ${s2};

            //repeat segment
            if (mod(angle, 2.0) >= 1.0) {
                angle = fract(angle);
            } else {
                angle = 1.0 - fract(angle);
            }
            angle += u_time;
            
            //unsquash segment
            angle /= SEGMENTS;
            angle *= PI * ${s3};
            
            vec2 point = vec2(radius * cos(angle), radius * sin(angle));
            point = fract(point);
            
            vec4 color = texture2D(image, point);
            gl_FragColor = color;
        }
        `
    sandbox.load(frag2)
    sandbox.setUniform('displacement', image)
})

segmentNumber.addEventListener('change', () => {
    numberValue.innerHTML = Number(segmentNumber.value) + 32;
    s2 = Number(segmentNumber.value).toFixed(2);
    console.log(segmentNumber)
    const frag2 = `
        #ifdef GL_ES
        precision highp float;
        #endif

        #define SEGMENTS 32.0
        #define PI 3.141592653589

        uniform float u_time;
        uniform vec2 resolution;
        uniform vec2 mouse;

        uniform sampler2D image;
        varying vec2 v_texcoord;

        void main(void)
        {
            vec2 uv = v_texcoord;
            uv *= 2.0;
            uv -= 1.0;
            
            // get the angle and radius
            float radius = length(uv);
            float angle = atan(uv.y, uv.x);
            
            //get segment
            angle /= PI * ${s1};
            angle *= SEGMENTS + ${s2};

            //repeat segment
            if (mod(angle, 2.0) >= 1.0) {
                angle = fract(angle);
            } else {
                angle = 1.0 - fract(angle);
            }
            angle += u_time;
            
            //unsquash segment
            angle /= SEGMENTS;
            angle *= PI * ${s3};
            
            vec2 point = vec2(radius * cos(angle), radius * sin(angle));
            point = fract(point);
            
            vec4 color = texture2D(image, point);
            gl_FragColor = color;
        }
        `
    sandbox.load(frag2)
    sandbox.setUniform('displacement', image)
})
segmentCompression.addEventListener('change', () => {
    compressionValue.innerHTML = Number(segmentCompression.value) + 32;
    s3 = Number(segmentCompression.value).toFixed(2);
    const frag2 = `
        #ifdef GL_ES
        precision highp float;
        #endif

        #define SEGMENTS 32.0
        #define PI 3.141592653589

        uniform float u_time;
        uniform vec2 resolution;
        uniform vec2 mouse;

        uniform sampler2D image;
        varying vec2 v_texcoord;

        void main(void)
        {
            vec2 uv = v_texcoord;
            uv *= 2.0;
            uv -= 1.0;
            
            // get the angle and radius
            float radius = length(uv);
            float angle = atan(uv.y, uv.x);
            
            //get segment
            angle /= PI * ${s1};
            angle *= SEGMENTS + ${s2};

            //repeat segment
            if (mod(angle, 2.0) >= 1.0) {
                angle = fract(angle);
            } else {
                angle = 1.0 - fract(angle);
            }
            angle += u_time;
            
            //unsquash segment
            angle /= SEGMENTS;
            angle *= PI * ${s3};
            
            vec2 point = vec2(radius * cos(angle), radius * sin(angle));
            point = fract(point);
            
            vec4 color = texture2D(image, point);
            gl_FragColor = color;
        }
        `
    sandbox.load(frag2)
    sandbox.setUniform('displacement', image)
})











const frag = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 resolution;
uniform vec2 mouse;

uniform sampler2D image;
varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
    
    // get the angle and radius
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    //get segment
    angle /= PI * ${s1};
    angle *= SEGMENTS;

    //repeat segment
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    angle += u_time;
    
    //unsquash segment
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = texture2D(image, point);
    gl_FragColor = color;
}
`
import { Canvas, glsl } from 'glsl-canvas-js';
import image from '/images/trails.jpg';
const canvas = document.querySelector('canvas');
const sandbox = new Canvas(canvas, {
    // vertexString: ``,
    // fragmentString: ``
});
sandbox.load(frag)
sandbox.setUniform('displacement', image)


