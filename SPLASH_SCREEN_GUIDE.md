# Welcome Splash Screen Feature

## Overview
A beautiful Christmas-themed welcome splash screen has been added to your website. It displays automatically when visitors first arrive and disappears after **3 seconds**.

## Features

### 🎄 Visual Elements
- **Festive Background**: Red to green gradient matching Christmas theme
- **Animated Decorations**: 
  - Christmas tree 🎄 (top-left)
  - Santa 🎅 (top-right)
  - Gift 🎁 (bottom-left)
  - Star ⭐ (bottom-right)
- **Snowfall Effect**: Animated snowflakes falling during splash screen
- **Welcome Image**: Custom Christmas welcome banner
- **Loading Bar**: Golden progress bar showing 3-second countdown
- **Festive Icons**: Bouncing Christmas emojis at bottom

### ✨ Animations
1. **Splash Fade In** (0.5s): Smooth entrance with slight zoom
2. **Image Zoom** (0.8s): Rotating welcome image entrance
3. **Title Bounce** (0.8s): "Welcome!" text bounces in
4. **Subtitle Fade** (0.8s): Subtitle fades up
5. **Icon Bounce**: Continuous bouncing of bottom icons
6. **Snowfall**: Continuous falling snowflakes
7. **Splash Fade Out** (0.8s): Smooth exit after 3 seconds

### ⏱️ Timing
- **Display Duration**: 3 seconds (3000ms)
- **Fade Out Animation**: 0.8 seconds (800ms)
- **Total Time**: ~3.8 seconds before main content shows

## Files Created/Modified

### New Files
1. **`splash-screen.css`** - All splash screen styling and animations
2. **`images/welcome-splash.png`** - Welcome banner image

### Modified Files
1. **`index.html`**:
   - Added splash screen HTML structure
   - Added link to splash-screen.css

2. **`script.js`**:
   - Added splash screen control logic
   - Automatic 3-second timer
   - Fade out and removal from DOM

## How It Works

```javascript
1. Page loads → Splash screen displays immediately
2. Timer starts (3 seconds)
3. After 3 seconds → Fade-out animation begins
4. After fade-out → Splash screen is removed from DOM
5. User sees main content
```

## Responsive Design
- **Desktop**: Full-size animations and decorations
- **Tablet (768px)**: Scaled down fonts and icons
- **Mobile (480px)**: Optimized for small screens

## Customization Options

### Change Display Duration
In `script.js`, line 13:
```javascript
}, 3000); // Change this number (in milliseconds)
```

### Change Colors
In `splash-screen.css`, line 10:
```javascript
background: linear-gradient(135deg, #c41e3a 0%, #8b0000 50%, #165b33 100%);
```

### Change Message
In `index.html`, lines 39-40:
```html
<h1 class="splash-title">🎄 Welcome! 🎄</h1>
<p class="splash-subtitle">Happy Holidays from Purat</p>
```

## Browser Compatibility
✅ Chrome/Edgeβ  Firefox
✅ Safari
✅ Mobile browsers
✅ All modern browsers with CSS animation support

## Performance
- Lightweight (only ~6.5KB CSS)
- No external dependencies
- Removed from DOM after display (no memory footprint)
- Uses CSS animations (hardware accelerated)

## User Experience
- First impression: WOW factor with festive greeting
- Non-intrusive: Automatically disappears
- Loading feedback: Progress bar shows wait time
- Accessible: Screen reader friendly with alt text

---

🎄 **Enjoy your festive welcome screen!** 🎅
