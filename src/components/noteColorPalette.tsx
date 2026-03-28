import { uiStyles } from "../uiStyles"

type PalettePosition = {
  top: number
  left: number
}

type NoteColorPaletteProps = {
  colors: readonly string[]
  selectedColor: string
  position: PalettePosition
  onClose: () => void
  onSelectColor: (color: string) => void
}

export function NoteColorPalette({
  colors,
  selectedColor,
  position,
  onClose,
  onSelectColor,
}: NoteColorPaletteProps) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className={uiStyles.notes.palettePopover}
        style={{ top: position.top, left: position.left }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Color palette"
      >
        {colors.map((color) => (
          <button
            key={color}
            className={`${uiStyles.notes.colorSwatch} ${
              selectedColor === color ? "ring-2 ring-stone-500" : ""
            }`}
            onClick={() => onSelectColor(color)}
            style={{ background: color }}
            type="button"
            aria-label={`Set note color to ${color}`}
          />
        ))}
      </div>
    </div>
  )
}
