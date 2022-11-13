precision highp float; 

uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float t = uTime;

  float dt = t * 0.65;
  // Control repetition of shapes over x (cos) and y (sin)
  float innerWave = cos(uv.x * 3. * dt) * sin(uv.y * 3. * dt);

  float wave = tan(
    length(uv.y) * 20. + innerWave * 2.
  ) * 0.5 + 0.5;
  wave = smoothstep(0.1, 0.12, wave);

  float wave2 = tan(
    length(uv.y) * 40. + innerWave * 3.
  ) * 0.5 + 0.5;
  wave2 = smoothstep(0.1, 0.11, wave2);

  vec3 color = vec3(0.95);
  color.g += wave2 / 0.004;
  color.b += wave * 0.65;
  color.r -= (wave + wave2) / 0.03;

  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.;
}
