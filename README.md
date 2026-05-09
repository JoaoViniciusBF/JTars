# JTARS

> Joaq’s Tactical Avatar Runtime System

JTARS is a real-time interactive avatar engine for livestreams where Twitch and YouTube chat users become RPG-style characters on screen.

Unlike traditional stream avatar tools, JTARS is designed as a modular runtime engine focused on gameplay systems, event-driven architecture, and scalable real-time interactions.

---

# Overview

JTARS transforms livestream chat into a living multiplayer environment.

Chat users are represented as interactive avatars capable of:

- Moving around the world
- Gaining XP
- Triggering actions
- Participating in events
- Owning pets
- Buying items
- Interacting with other players

The engine is built to support long-term expansion into a full interactive livestream platform.

---

# Core Principles

## Real-Time First

Immediate visual feedback is critical.

Actions triggered from chat should appear on screen with minimal latency.

---

## Event-Driven Architecture

JTARS is fully event-driven.

Systems communicate through events instead of direct coupling.

```text
Chat → Providers → Event Bus → Core Systems → WebSocket → Overlay → Rendering
```

Benefits:
- Scalability
- Extensibility
- Easier testing
- Better separation of concerns
- Cleaner feature integration

---

## Modular Design

The project is organized as a monorepo with isolated applications and reusable packages.

This allows systems to evolve independently while sharing common logic and types.

---

# Tech Stack

## Frontend (Overlay)

- React
- PixiJS

Responsibilities:
- Rendering
- Animations
- HUD/UI
- Visual effects
- Avatar updates

---

## Backend

- Node.js
- TypeScript

Responsibilities:
- Chat ingestion
- Event processing
- Gameplay systems
- State management
- WebSocket communication

---

## Database

- PostgreSQL

Used for:
- User progression
- Inventory
- Economy systems
- Persistent data

---

## Chat Integrations

### Twitch
- `tmi.js`

### YouTube
- YouTube Data API

---

## Communication

- WebSockets

Used for real-time synchronization between backend systems and the overlay renderer.

---

# Monorepo Structure

```text
apps/
  overlay/      # React + PixiJS overlay renderer
  server/       # Backend services + websocket gateway

packages/
  core/         # Shared game logic and types
  chat/         # Twitch/YouTube providers
  events/       # Event bus implementation
  avatars/      # Avatar assembly and animation systems
```

---

# Architecture

## High-Level Flow

```text
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
│ XP / Pets / Events │
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
```

---

# Avatar System

JTARS uses modular avatars assembled from interchangeable parts.

Avatar components:
- Head
- Body
- Arms
- Legs
- Accessories

All parts share a common skeletal rig, enabling:
- Shared animations
- Cosmetic customization
- Efficient rendering
- Easier content creation

---

# Features

## MVP Goals

- Twitch chat integration
- YouTube chat integration
- Real-time avatar spawning
- Event bus architecture
- WebSocket synchronization
- XP and leveling system
- Basic interactions
- Modular avatars
- Shared animation system

---

## Planned Features

- Pets and companions
- Inventory system
- Economy/shop system
- Equipment and cosmetics
- Stream-wide events
- Abilities and combat
- AI/NPC systems
- Creator dashboards
- Plugin architecture
- Persistent worlds

---

# Event System

The event bus powers all runtime communication.

Example events:

```ts
USER_JOINED
CHAT_MESSAGE
USER_GAINED_XP
PET_SUMMONED
ITEM_PURCHASED
ABILITY_CAST
STREAM_EVENT_STARTED
```

This architecture allows new systems to be added without tightly coupling features together.

---

# Real-Time Performance Goals

JTARS is designed with low-latency interactions in mind.

Key priorities:
- Lightweight WebSocket payloads
- Minimal render overhead
- Event-based synchronization
- Decoupled systems
- Predictable rendering pipelines

---

# MVP Philosophy

Focus on building stable foundations first.

Development priorities:
1. Reliable event pipeline
2. Stable overlay rendering
3. Real-time synchronization
4. Incremental gameplay systems

Avoid premature overengineering.

---

# Development Roadmap

## Phase 1
- Event bus foundation
- Twitch integration
- Overlay rendering
- Avatar spawning
- WebSocket protocol

## Phase 2
- XP systems
- Persistent users
- YouTube integration
- Basic gameplay mechanics

## Phase 3
- Pets
- Shop/economy
- Cosmetics
- Stream events

## Phase 4
- Plugin systems
- Creator tooling
- AI systems
- Multi-stream support

---

# Getting Started

## Requirements

- Node.js
- PostgreSQL
- pnpm (recommended)

---

## Install

```bash
pnpm install
```

---

## Development

Start backend:

```bash
pnpm --filter server dev
```

Start overlay:

```bash
pnpm --filter overlay dev
```

---

# Project Goals

JTARS is intended to evolve beyond a simple stream overlay.

The long-term vision is a scalable interactive runtime platform where livestream communities become active participants inside persistent multiplayer worlds.

---

# Contributing

The project is currently in active architecture and MVP development.

Contributions, ideas, and experimentation are welcome.

---

# License

MIT
