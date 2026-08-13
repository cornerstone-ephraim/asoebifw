# Animation

The animation layer is shared infrastructure, not a source of global page timelines.

- `motion/` owns declarative interface and presence patterns.
- `gsap/` owns justified cinematic timelines and ScrollTrigger orchestration.
- `hooks/` owns reduced-motion and lifecycle integration.
- `presets/` owns role-based reveal, continuity, progression, and feedback presets.
- `utilities/` owns library-neutral helpers.

CSS handles micro-transitions. Motion and GSAP must not control the same property on the same element. Stable and reduced-motion states must expose all content without JavaScript choreography.
