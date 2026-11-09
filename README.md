# Jensen (Jinghao) Zhou

Personal research website at [jensenzhoujh.github.io](https://jensenzhoujh.github.io).

The homepage, stories index, and long-form stories are static HTML, with shared
styles in `css/main.css` and a small navigation enhancement in `js/main.js`.
No build step is required. Preview from the repository root:

```sh
python3 -m http.server 8770 --bind 127.0.0.1
```

Open `http://127.0.0.1:8770/`. Layouts support desktop and mobile, keyboard
navigation, and reduced-motion preferences. Existing research links, publication
artwork, and story text are retained.

Originally adapted from [Yangqing Jia's website](http://daggerfs.com/).

The AVM thumbnail is an approximately 17.5-second animated WebP extracted from
the AVM teaser. It opens with the bicycle orbit (2–5 s), followed by the complete
flower scene (63.75–69.75 s, at 2× speed), the complete furnished indoor camera
sequence (69.75–75.75 s, retimed to 5.5 s), and excerpts at 22–25 s and
40.75–43.75 s.
It uses the same thumbnail dimensions as the other publications. A picture source
shows a static bicycle frame for reduced-motion preferences or browsers without
WebP support. The MP4 is retained as the source for the animation.
