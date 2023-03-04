uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vDistorsion;
varying vec3 vPosition;

void main() {
    float r = vDistorsion * uSurfaceColor.x * uColorMultiplier + uColorOffset;
    float g = vDistorsion * uSurfaceColor.y * uColorMultiplier + uColorOffset;
    float b = vDistorsion * uSurfaceColor.z * uColorMultiplier + uColorOffset;
    gl_FragColor = vec4(r, g, b, 1.0);
}