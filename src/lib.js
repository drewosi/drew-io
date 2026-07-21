/**
 * DREW.OS 2.0 — single import surface. Everything you need to build anything:
 *   import { Button, Card, Modal, DecodeText, Reveal, toast } from './lib.js';
 */

// actions
export { Button } from './components/actions/Button.jsx';
export { ThemeToggle } from './components/actions/ThemeToggle.jsx';

// surfaces
export { Card } from './components/surfaces/Card.jsx';
export { MonoLabel } from './components/surfaces/MonoLabel.jsx';
export { SectionHead } from './components/surfaces/SectionHead.jsx';
export { Wordmark } from './components/surfaces/Wordmark.jsx';
export { Accordion } from './components/surfaces/Accordion.jsx';
export { Kbd } from './components/surfaces/Kbd.jsx';

// forms
export { Input } from './components/forms/Input.jsx';
export { Textarea } from './components/forms/Textarea.jsx';
export { Select } from './components/forms/Select.jsx';
export { Checkbox } from './components/forms/Checkbox.jsx';
export { Radio, RadioGroup } from './components/forms/Radio.jsx';
export { Switch } from './components/forms/Switch.jsx';
export { Slider } from './components/forms/Slider.jsx';

// feedback
export { Badge } from './components/feedback/Badge.jsx';
export { Alert } from './components/feedback/Alert.jsx';
export { Toast, ToastHost, toast } from './components/feedback/Toast.jsx';
export { Skeleton } from './components/feedback/Skeleton.jsx';

// data
export { Stat } from './components/data/Stat.jsx';
export { Progress } from './components/data/Progress.jsx';
export { Table } from './components/data/Table.jsx';
export { ChartFrame } from './components/data/ChartFrame.jsx';

// navigation
export { Sidebar } from './components/navigation/Sidebar.jsx';
export { Tabs } from './components/navigation/Tabs.jsx';
export { Breadcrumbs } from './components/navigation/Breadcrumbs.jsx';
export { ScrollProgress } from './components/navigation/ScrollProgress.jsx';
export { Steps } from './components/navigation/Steps.jsx';

// overlays
export { Modal } from './components/overlays/Modal.jsx';
export { Dropdown } from './components/overlays/Dropdown.jsx';
export { Tooltip } from './components/overlays/Tooltip.jsx';
export { CommandPalette } from './components/overlays/CommandPalette.jsx';
export { Keymap } from './components/overlays/Keymap.jsx';

// motion
export { DecodeText } from './components/motion/DecodeText.jsx';
export { Ticker } from './components/motion/Ticker.jsx';
export { Reveal } from './components/motion/Reveal.jsx';
export { TypeText } from './components/motion/TypeText.jsx';
export { NumberTicker } from './components/motion/NumberTicker.jsx';
export { HairlineDraw } from './components/motion/HairlineDraw.jsx';
export { StaggerChildren } from './components/motion/StaggerChildren.jsx';
export { PageTransition } from './components/motion/PageTransition.jsx';
export { ScanSweep } from './components/motion/ScanSweep.jsx';
export { BlinkDot } from './components/motion/BlinkDot.jsx';
export { CursorCoords } from './components/motion/CursorCoords.jsx';
export { SectionNumeral } from './components/motion/SectionNumeral.jsx';
export { ScrollScene } from './components/motion/ScrollScene.jsx';
export { Parallax } from './components/motion/Parallax.jsx';
export { FocusReveal } from './components/motion/FocusReveal.jsx';
export { MaskReveal } from './components/motion/MaskReveal.jsx';
export { Magnetic } from './components/motion/Magnetic.jsx';
export { Tilt } from './components/motion/Tilt.jsx';
export { HUDCallout } from './components/motion/HUDCallout.jsx';
export { FilmGrain } from './components/motion/FilmGrain.jsx';
export { ParticleField } from './components/motion/ParticleField.jsx';
export { Wayfinder } from './components/motion/Wayfinder.jsx';

// hooks
export { useReveal, useReducedMotion } from './hooks/useReveal.js';
export { useCountUp } from './hooks/useCountUp.js';
export { useClock } from './hooks/useClock.js';
export { useScrollProgress } from './hooks/useScrollProgress.js';
export { useScrollField } from './motion/scrollField.js';
export { useSpring } from './motion/spring.js';
export { useSceneProgress } from './motion/sceneContext.js';
