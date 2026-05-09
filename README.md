JTARS

Joaq’s Tactical Avatar Runtime System

JTARS is a real-time avatar runtime engine for livestreams where Twitch and YouTube chat users become interactive on-screen characters with RPG-style mechanics.

Unlike traditional stream avatar tools, JTARS is designed as a modular real-time interaction engine built around events, gameplay systems, and scalable architecture.

Users are not passive viewers — they actively participate in the stream world.

Vision

JTARS aims to transform livestream chat into a living multiplayer environment.

Chat messages trigger gameplay actions in real time:

Spawn avatars
Gain XP
Trigger abilities
Interact with pets
Participate in events
Buy items from shops
Influence the world dynamically

The system is designed for extensibility, allowing future expansion into advanced RPG mechanics, AI-driven systems, mini-games, and creator-defined gameplay rules.

Core Principles
Real-Time First

Low-latency feedback is critical.

Every message, action, and event should feel immediate on stream.

Event-Driven Architecture

All major systems communicate through events.

This keeps the platform modular, scalable, and easy to extend.

Chat → Providers → Event Bus → Core Systems → WebSocket → Overlay → Rendering
Decoupled Systems

Chat integrations, game logic, rendering, and networking remain isolated.

This enables:

Easier maintenance
Independent scaling
Cleaner testing
Faster iteration
Modular Design

JTARS is built as a monorepo with reusable packages and isolated applications.

The goal is long-term maintainability without early overengineering.

Features
Current / MVP Goals
Twitch chat integration
YouTube chat integration
Real-time avatar spawning
Modular avatar system
Shared skeletal animation rig
WebSocket communication
Event bus architecture
XP and leveling system
Basic movement and interactions
Overlay rendering with PixiJS
Planned Systems
Pets
Shops and economy
Inventory system
Equipment and cosmetics
Stream events and raids
Abilities and combat
AI/NPC interactions
Creator tools and dashboards
Multiple game modes
Persistent progression
Tech Stack
Frontend (Overlay)
React
PixiJS

Responsibilities:

Rendering
Animation
Visual effects
UI/HUD
Real-time avatar updates
Backend
Node.js
TypeScript

Responsibilities:

Chat ingestion
Game logic
Event processing
State management
WebSocket server
Database
PostgreSQL

Used for:

User persistence
Progression
Inventory
Economy systems
Analytics
Chat Integrations
Twitch
tmi.js
YouTube
YouTube Data API
Communication
WebSockets

Used for real-time synchronization between backend systems and the overlay renderer.

Repository Structure
apps/
  overlay/    # React + PixiJS rendering client
  server/     # Backend systems + websocket server

packages/
  core/       # Shared logic, commands, gameplay systems
  chat/       # Twitch/YouTube providers
  events/     # Event bus system
  avatars/    # Avatar assembly + animation systems
System Architecture
High-Level Flow
┌─────────────┐
│ Twitch Chat │
└──────┬──────┘
       │
┌──────▼──────┐
│ Chat Layer  │
│ Providers   │
└──────┬──────┘
       │ Events
┌──────▼──────┐
│ Event Bus   │
└──────┬──────┘
       │
┌──────▼─────────────┐
│ Core Game Systems  │
│ XP / Combat / Pets │
└──────┬─────────────┘
       │
┌──────▼──────┐
│ WebSocket   │
│ Gateway     │
└──────┬──────┘
       │
┌──────▼──────┐
│ Overlay     │
│ React/Pixi  │
└─────────────┘
Avatar System

JTARS uses a modular avatar architecture.

Characters are assembled dynamically using interchangeable parts:

Head
Body
Arms
Legs
Accessories

All avatar parts share a common skeletal rig, enabling:

Shared animations
Cosmetic swapping
Efficient rendering
Scalable content creation

This allows thousands of visual combinations without requiring separate animations for every character.

Event System

The event bus is the backbone of JTARS.

Example events:

USER_JOINED
CHAT_MESSAGE
USER_GAINED_XP
PET_SUMMONED
ITEM_PURCHASED
ABILITY_CAST
STREAM_EVENT_STARTED

Benefits:

Loose coupling
Easier feature expansion
Plugin-like architecture
Better observability
Cleaner testing
Real-Time Considerations

JTARS prioritizes responsiveness and smooth rendering.

Key goals:

Minimize WebSocket payload sizes
Avoid unnecessary state synchronization
Use event snapshots instead of full state replication
Keep rendering deterministic
Isolate heavy computations from render loops
MVP Philosophy

JTARS intentionally focuses on incremental development.

The goal is:

Build a stable event pipeline
Render avatars reliably
Synchronize real-time interactions
Expand gameplay systems gradually

Avoid premature complexity.

Build foundations first.

Development Goals
Near-Term
Establish event bus foundation
Implement Twitch + YouTube providers
Create avatar rendering pipeline
Define shared message protocol
Build XP and leveling systems
Mid-Term
Persistent progression
Economy systems
Pets and companions
Advanced animations
Stream interaction tools
Long-Term
Creator scripting systems
Plugin architecture
AI-driven interactions
Multi-stream support
Hosted platform / SaaS architecture
Guiding Philosophy

JTARS is not just an overlay.

It is a real-time interactive runtime designed to turn livestream audiences into active participants inside a persistent evolving world.

Contributing

JTARS is currently in active architecture and MVP development.

Contributions, ideas, and experimentation are welcome as the project evolves.
