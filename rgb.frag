precision highp float;

uniform float time;
uniform vec2 resolution;

float pi = 3.14159;
float r(float x){ return fract(sin(dot(vec2(x), vec2(12.9898, 78.233))) * 412.5453); }
float i(vec2 a, vec2 b, float x) { return ((a.y-b.y)/(a.x-b.x))*(x-b.x)+b.y; }
float c(vec2 p, vec2 o, float r) { return 1.-smoothstep (r, r+.002, length(p-o)-r); }

void main() {
    float x = time;
    float sx = time + 5.;
    float m = .4;
    vec3 upper = vec3(m*cos(x)+m,m*cos(x+pi/2.)+m,m*cos(x+3.*pi/2.)+m);
    vec3 lower  = vec3(m*cos(sx)+m,m*cos(sx+pi/2.)+m,m*cos(sx+3.*pi/2.)+m);
    vec2 uv = (gl_FragCoord.xy - resolution.xy * .5) / resolution.y;
    float f = floor((uv.x)*50.+1.);
    float o = cos(uv.x*10.)*.1-.05+i(vec2(f,r(f)),vec2(f+1.,r(f+1.)),uv.x*50.+1.)*.06-0.03;
    float l = 1.-smoothstep(0.,0.002,uv.y-(o));
    float v = cos(uv.x*9.)*.08-.089+i(vec2(f,r(f+5.8)),vec2(f+1.,r(f+6.8)),uv.x*50.+1.)*.04-0.02;
    float p = 1.-smoothstep(0.,0.002,uv.y-(v));
    vec3 col = mix(upper, lower,uv.y*5.);
    col = mix(vec3(.05), col, c(uv, vec2(0.), .1));
    col = mix(col, mix(vec3(1.), vec3(.5, .8, .8),-uv.y*10.), l);
    col = mix(col, vec3(.05), p);
    col = mix(vec3(.05), col, c(uv, vec2(0.), .14));
    gl_FragColor = vec4(col,1.0);
}
