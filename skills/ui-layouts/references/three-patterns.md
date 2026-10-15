# three.js / R3F patterns

All snippets are React Three Fiber. For vanilla three.js, the math is identical — create meshes in a loop and update them in the render loop.

## Shared setup

```tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export function HeroCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
```

Next.js: `const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })`.

Fallback gate:
```ts
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const webgl = (() => { try { return !!document.createElement('canvas').getContext('webgl2') } catch { return false } })()
const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || ((navigator as any).deviceMemory || 8) <= 4
const use3D = webgl && !reduce && !lowEnd
```
At runtime, wrap the scene in drei `<PerformanceMonitor onDecline={() => setUse3D(false)}>` so devices that still struggle drop to the static fallback.

Loop wrap rule: every looping pattern below moves items with `t = ((i / N + scroll) % 1 + 1) % 1`. When `t` wraps 1 → 0 the item teleports, so **scale it to 0 near the wrap point** (`fadeEdge` below). Never let an item jump while it is visible.

Aspect rule: drei `<Image scale={[w, h]}>` sets the mesh scale. Animating with `m.scale.setScalar(s)` turns every image into a square — always use `m.scale.set(w * s, h * s, 1)`.

```ts
// 1 in the middle of the range, eases to 0 within `edge` of both ends
const fadeEdge = (t: number, edge = 0.08) =>
  THREE.MathUtils.smoothstep(t, 0, edge) * (1 - THREE.MathUtils.smoothstep(t, 1 - edge, 1))
```

Color: custom `ShaderMaterial`s don't color-manage on their own. Set `texture.colorSpace = THREE.SRGBColorSpace` and end every fragment shader with `#include <colorspace_fragment>`, otherwise photos come out washed out.

Image plane (reused everywhere):
```tsx
import { Image } from '@react-three/drei'
<Image url={src} scale={[w, h]} radius={0.06} transparent />
```

Shared scroll value (drag + wheel, damped):
```ts
const target = useRef(0), current = useRef(0)
// onWheel: target.current += e.deltaY * 0.002 ; onPointerMove while dragging: target.current -= dx * 0.004
useFrame((_, dt) => { current.current = THREE.MathUtils.damp(current.current, target.current, 6, dt) })
```

---

## Tunnel (L06)

Cards on both walls of a corridor, camera looking down the axis. Center cards are far away (small), edge cards near (big).

```tsx
const COUNT = 12
const W = 1.2, H = 1.7
function Tunnel({ images, scroll }) {
  const group = useRef<THREE.Group>(null!)
  useFrame(() => {
    group.current.children.forEach((m, i) => {
      // t in [-1, 1]: -1 = far left edge, 0 = center, 1 = far right edge
      let t = ((i / COUNT + scroll.current) % 1 + 1) % 1 * 2 - 1
      const side = Math.sign(t) || 1
      const d = Math.abs(t)                     // 0 center → 1 edge
      m.position.set(side * (0.3 + d * 4.2), 0, -8 + d * 8)  // edges come toward camera
      m.rotation.y = -side * THREE.MathUtils.lerp(0.2, 1.1, d)  // face inward like walls
      // hide at the vanishing point (side flip) and at the outer edge (loop wrap)
      const s = THREE.MathUtils.lerp(0.35, 1.4, d) * fadeEdge(d, 0.06)
      m.scale.set(W * s, H * s, 1)
    })
  })
  return <group ref={group}>{images.map((src, i) => <Image key={i} url={src} scale={[W, H]} radius={0.08} />)}</group>
}
```
Corner chrome (logo, menu, labels) stays DOM, `position:absolute` in the four corners.

## Spiral Ring (L07)

```tsx
// W, H = card size passed to <Image scale={[W, H]}>
items.forEach((m, i) => {
  const t = ((i / N + scroll) % 1 + 1) % 1
  const a = t * Math.PI * 2
  m.position.set(Math.cos(a) * 2.6, Math.sin(a) * 2.6, THREE.MathUtils.lerp(-3, 1.5, t))
  // grows toward t=1, then shrinks to 0 just before the wrap so the biggest card never pops to the smallest spot
  const s = THREE.MathUtils.lerp(0.3, 1.6, t) * (1 - THREE.MathUtils.smoothstep(t, 0.9, 1))
  m.scale.set(W * s, H * s, 1)
})
```
Featured item = the one with the largest `s` (around t ≈ 0.88); show its caption in DOM.

## Parallax Planes (L04, L16)

Each plane at its own z (-2…1). Mouse moves the camera a little; depth does the rest.
```tsx
useFrame(({ pointer, camera }, dt) => {
  camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.4, 4, dt)
  camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.25, 4, dt)
  camera.lookAt(0, 0, 0)
})
```
Plus idle float: drei `<Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>` around each plane.

## Bend Shader (L08)

Paper-like curved panels.
```glsl
// vertex
uniform float uBend;    // -0.6..0.6
uniform float uTime;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  p.z += sin(uv.x * 3.14159) * uBend;               // curve along x
  p.z += sin(uv.y * 3.0 + uTime * 0.6) * 0.03;      // gentle breathing
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
// fragment
uniform sampler2D uTex; varying vec2 vUv;
void main(){
  gl_FragColor = texture2D(uTex, vUv);
  #include <colorspace_fragment>
}
```
Use `planeGeometry args={[w, h, 32, 16]}` (needs segments). Text panels: drei `<Html transform occlude>` on a flat plane or render text with drei `<Text>`.

## Smear Shader (L10)

Side posters stretch into chromatic light trails toward the screen edge.
```glsl
uniform sampler2D uTex;
uniform float uSmear;   // 0 = sharp (center card), 1 = full smear
uniform float uDir;     // -1 left card, 1 right card
varying vec2 vUv;
void main(){
  vec2 uv = vUv;
  // compress the outer part of the card so pixels stretch outward
  float edge = uDir > 0.0 ? uv.x : 1.0 - uv.x;
  float k = smoothstep(0.15, 1.0, edge) * uSmear;
  float sx = mix(uv.x, uDir > 0.0 ? 0.15 : 0.85, k);
  float off = 0.015 * k;
  float r = texture2D(uTex, vec2(sx + off * uDir, uv.y)).r;
  float g = texture2D(uTex, vec2(sx, uv.y)).g;
  float b = texture2D(uTex, vec2(sx - off * uDir, uv.y)).b;
  float a = 1.0 - smoothstep(0.85, 1.0, edge) * uSmear * 0.6;
  gl_FragColor = vec4(r, g, b, a);
  #include <colorspace_fragment>
}
```
```tsx
<shaderMaterial args={[{ uniforms, vertexShader, fragmentShader }]} transparent depthWrite={false} />
```
Side meshes are much wider than the poster (e.g. 4× width) so the smear has room; geometry curved like L08. Drive `uSmear` from |drag velocity| + a base of 0.7 for side cards.

## Cascading Deck (L11)

```tsx
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-5, 3, -6), new THREE.Vector3(-1, 0.5, -2), new THREE.Vector3(3, -2, 1), new THREE.Vector3(6, -4, 3),
])
// W, H = card size passed to <Image scale={[W, H]}>
items.forEach((m, i) => {
  const t = ((i / N + scroll) % 1 + 1) % 1
  m.position.copy(curve.getPointAt(t))
  m.rotation.set(0, -0.4, -0.25 + Math.sin(i * 12.9) * 0.15)
  const s = fadeEdge(t, 0.1)               // near end wraps back to the far end
  m.scale.set(W * s, H * s, 1)
})
```
Postprocessing:
```tsx
<EffectComposer><ChromaticAberration offset={[0.002, 0.001]} /><Noise opacity={0.04} /></EffectComposer>
```

## Product model (L14)

```tsx
<Stage environment="city" intensity={0.5} adjustCamera={1.2}>
  <PresentationControls global polar={[-0.2, 0.2]} azimuth={[-0.6, 0.6]}>
    <Model url="/product.glb" />
  </PresentationControls>
</Stage>
```
Compress GLB with `gltf-transform optimize` (draco/meshopt + webp textures) — target < 2 MB.

## Multiple 3D sections (3D mode)

One fixed canvas behind the page, with each section rendering into its own DOM box through drei `<View>`. This means one WebGL context, shared textures, and no context-limit crashes.
```tsx
// layout: one canvas for the whole page
<Canvas className="!fixed inset-0 pointer-events-none" eventSource={document.body} dpr={[1, 1.75]}>
  <View.Port />
</Canvas>

// any section
<section className="relative h-[100svh]">
  <View className="absolute inset-0">
    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
    <SceneLighting />  {/* shared component: same env + lights everywhere */}
    <Tunnel />
  </View>
  <h2 className="relative">…</h2>
</section>
```
Views outside the viewport aren't rendered. Keep one `SceneLighting` and one damping constant in a shared module, so all sections feel like the same world.

## Performance checklist

- Textures: webp/avif, max 1600px long edge, `useTexture.preload`.
- Pause when hero not visible: `frameloop="demand"` + `invalidate()` from an IntersectionObserver loop, or unmount the canvas.
- Mobile: halve item counts, `dpr={[1, 1.5]}`, disable postprocessing.
- LCP: render the first poster/hero image as a real `<img>` underneath, fade the canvas in once ready (`onCreated`).
