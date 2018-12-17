varying vec4 vColor;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1);
    vColor = gl_Position * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}