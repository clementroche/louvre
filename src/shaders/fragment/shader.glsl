uniform vec3 color;
uniform vec2 resolution;
uniform sampler2D texture;
uniform sampler2D alphaMap;
        varying vec2 vUv;
    void main() {
        // gl_FragColor = texture2D(texture, vUv);
        // gl_FragColor = vec4(texture2D(texture, vUv).xyz,0.3/texture2D(alphaMap, vUv).x);
        gl_FragColor = vec4(1.,0,0,0.001);
        // gl_FragColor = vec4(0.3/texture2D(alphaMap, vUv).r,0,0,0.3/texture2D(alphaMap, vUv).r);
    }
    