import foyer from "@/assets/room-foyer.jpg";
import studio from "@/assets/room-studio.jpg";
import trophy from "@/assets/room-trophy.jpg";
import contact from "@/assets/room-contact.jpg";
import secret from "@/assets/room-secret.jpg";

export type RoomId =
  | "foyer"
  | "studio"
  | "projects"
  | "trophy"
  | "certifications"
  | "whiteboard"
  | "contact"
  | "secret";

export interface Room {
  id: RoomId;
  name: string;
  tagline: string;
  image: string;
  accent: string;
}

export const ROOMS: Room[] = [
  { id: "foyer", name: "Grand Foyer", tagline: "Welcome — let me introduce myself", image: foyer, accent: "oklch(0.92 0.05 350)" },
  { id: "studio", name: "Developer Studio", tagline: "Where the code comes alive", image: studio, accent: "oklch(0.72 0.22 8)" },
  { id: "projects", name: "Project Wing", tagline: "Step inside each of my worlds", image: studio, accent: "oklch(0.80 0.18 320)" },
  { id: "trophy", name: "Achievement Gallery", tagline: "Trophies under glass", image: trophy, accent: "oklch(0.84 0.14 60)" },
  { id: "certifications", name: "Certification Museum", tagline: "Curated under museum lights", image: trophy, accent: "oklch(0.86 0.12 80)" },
  { id: "whiteboard", name: "Creative Whiteboard", tagline: "Draw a little something", image: foyer, accent: "oklch(0.88 0.10 200)" },
  { id: "contact", name: "Pink Telephone Room", tagline: "Pick up — let's talk", image: contact, accent: "oklch(0.78 0.20 350)" },
  { id: "secret", name: "Secret Library", tagline: "Pssst… behind the bookshelf", image: secret, accent: "oklch(0.55 0.20 10)" },
];
