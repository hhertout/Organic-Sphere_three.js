varying float vTime;
varying vec3 vPosition;

void main() {
    gl_FragColor = vec4(1.0, vPosition.gb, 1.0);
}