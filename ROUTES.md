# Aura Player Routes

The application uses React Router for client-side navigation. All routes are protected under the main player layout with persistent sidebar and player bar.

## Route Structure

```
/                 - Home Page (Featured albums, top recommendations, continue playing)
/library          - Library Page (Liked songs and Playlists management)
/radio            - Radio Page (Radio browsing)
/music            - Music Page (Browse all music and genres)
```

## Route Implementation

### Files
- `src/routes/index.jsx` - Route definitions and page mappings
- `src/components/PlayerLayout.jsx` - Main layout wrapper with sidebar, header, and player bar
- `src/components/layout/Sidebar.jsx` - Navigation component using React Router

### Navigation
The sidebar uses `useNavigate()` and `useLocation()` hooks to handle route transitions and active state tracking.

### Persistent Elements
- **Sidebar** - Fixed left navigation with active route indicator
- **Header** - Search bar and playback information
- **Now Playing Bar** - Fixed bottom player controls and track display

All pages render within the main layout while these elements persist across navigation.

## Routing Features

- Hash-based routing for better compatibility
- Active route highlighting in sidebar
- Clean URL paths for each section
- Automatic state management through component hierarchy
- Playlist modal accessible from any page
- Liked songs management across all pages
