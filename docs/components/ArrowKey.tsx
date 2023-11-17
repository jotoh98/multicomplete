const arrows = {
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
}

export const ArrowKey = (props: { dir: keyof typeof arrows }) => (
  <kbd>
    {arrows[props.dir]}
    <span className="sr-only">{props.dir}</span>
  </kbd>
)
