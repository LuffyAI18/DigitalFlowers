// All customization options for the bouquet builder

export const FLOWER_TYPES = [
  { id: "rose", label: "Rose", emoji: "🌹", description: "Classic romantic beauty" },
  { id: "sunflower", label: "Sunflower", emoji: "🌻", description: "Radiant and joyful" },
  { id: "lily", label: "Lily", emoji: "🌸", description: "Elegant and pure" },
  { id: "tulip", label: "Tulip", emoji: "🌷", description: "Timeless and graceful" },
  { id: "daisy", label: "Daisy", emoji: "🌼", description: "Sweet and cheerful" },
  { id: "orchid", label: "Orchid", emoji: "🪷", description: "Exotic and luxurious" },
  { id: "lotus", label: "Lotus", emoji: "🪷", description: "Serene and spiritual" },
  { id: "peony", label: "Peony", emoji: "🌸", description: "Lush and romantic" },
  { id: "marigold", label: "Marigold", emoji: "🌼", description: "Vibrant and festive" },
  { id: "lavender", label: "Lavender", emoji: "💜", description: "Calming and fragrant" },
  { id: "hibiscus", label: "Hibiscus", emoji: "🌺", description: "Tropical and bold" },
  { id: "carnation", label: "Carnation", emoji: "🌸", description: "Heartfelt and classic" },
  { id: "hydrangea", label: "Hydrangea", emoji: "💐", description: "Full and dreamy" },
  { id: "wildflower", label: "Wild Bouquet", emoji: "💐", description: "Free-spirited mix" },
  { id: "bridal", label: "Bridal Premium", emoji: "👰", description: "Elegant bridal style" },
  { id: "minimalist", label: "Single Stem", emoji: "🌿", description: "Minimal and refined" },
] as const;

export const FLOWER_COLORS = [
  { id: "classic-red", label: "Classic Red", hex: "#dc2626", gradient: ["#dc2626", "#991b1b"] },
  { id: "romantic-pink", label: "Romantic Pink", hex: "#ec4899", gradient: ["#f472b6", "#ec4899"] },
  { id: "soft-blush", label: "Soft Blush", hex: "#fda4af", gradient: ["#fecdd3", "#fda4af"] },
  { id: "bright-yellow", label: "Bright Yellow", hex: "#facc15", gradient: ["#fde047", "#facc15"] },
  { id: "pastel-yellow", label: "Pastel Yellow", hex: "#fef08a", gradient: ["#fefce8", "#fef08a"] },
  { id: "white-ivory", label: "White Ivory", hex: "#fef7df", gradient: ["#ffffff", "#fef9e7"] },
  { id: "lavender-purple", label: "Lavender", hex: "#a78bfa", gradient: ["#c4b5fd", "#a78bfa"] },
  { id: "deep-violet", label: "Deep Violet", hex: "#7c3aed", gradient: ["#8b5cf6", "#6d28d9"] },
  { id: "coral-orange", label: "Coral Orange", hex: "#fb923c", gradient: ["#fdba74", "#fb923c"] },
  { id: "peach", label: "Peach", hex: "#fdba74", gradient: ["#fed7aa", "#fdba74"] },
  { id: "mixed-rainbow", label: "Rainbow Mix", hex: "#f472b6", gradient: ["#f472b6", "#facc15", "#60a5fa"] },
  { id: "royal-gold", label: "Royal Gold", hex: "#d97706", gradient: ["#f59e0b", "#d97706"] },
  { id: "champagne", label: "Champagne", hex: "#e8d5a3", gradient: ["#f5e6c8", "#e8d5a3"] },
  { id: "sunset", label: "Sunset", hex: "#f97316", gradient: ["#fb923c", "#ef4444"] },
  { id: "monochrome", label: "Monochrome", hex: "#6b7280", gradient: ["#9ca3af", "#4b5563"] },
] as const;

export const BOUQUET_STYLES = [
  { id: "single-flower", label: "Single Flower", description: "Simple & pure" },
  { id: "small-hand-tied", label: "Hand-Tied", description: "Classic bouquet" },
  { id: "dense-luxury", label: "Dense Luxury", description: "Full and opulent" },
  { id: "layered", label: "Layered", description: "Depth & dimension" },
  { id: "cascading", label: "Cascading", description: "Flowing & romantic" },
  { id: "rounded", label: "Rounded", description: "Balanced & sweet" },
  { id: "asymmetrical", label: "Asymmetrical", description: "Artsy & unique" },
  { id: "modern-minimalist", label: "Minimalist", description: "Clean & modern" },
  { id: "rustic-wildflower", label: "Rustic Wild", description: "Natural & free" },
  { id: "premium-gift", label: "Premium Gift", description: "Luxurious gift" },
  { id: "celebratory", label: "Celebratory", description: "Joy & festivity" },
  { id: "apology", label: "Apology", description: "Heartfelt sorry" },
  { id: "bridal", label: "Bridal", description: "Wedding elegance" },
] as const;

export const WRAPPING_STYLES = [
  { id: "kraft-paper", label: "Kraft Paper", description: "Natural & rustic" },
  { id: "satin-wrap", label: "Satin Wrap", description: "Soft & luxurious" },
  { id: "translucent-floral", label: "Floral Wrap", description: "Light & airy" },
  { id: "luxury-matte", label: "Luxury Matte", description: "Premium matte" },
  { id: "ribbon-bundle", label: "Ribbon Bundle", description: "Tied elegantly" },
  { id: "gold-trimmed", label: "Gold Trimmed", description: "Golden edge" },
  { id: "pastel-paper", label: "Pastel Paper", description: "Soft & sweet" },
  { id: "classic-cone", label: "Classic Cone", description: "Traditional style" },
  { id: "premium-box", label: "Premium Box", description: "Boxed gift" },
  { id: "vase-style", label: "Vase Style", description: "Glass vase" },
  { id: "minimal-bundle", label: "Minimal Bundle", description: "Barely wrapped" },
] as const;

export const RIBBON_STYLES = [
  { id: "gold-ribbon", label: "Gold Ribbon", color: "#d97706" },
  { id: "silver-ribbon", label: "Silver Ribbon", color: "#9ca3af" },
  { id: "white-satin", label: "White Satin", color: "#f9fafb" },
  { id: "blush-pink", label: "Blush Pink", color: "#fda4af" },
  { id: "red-ribbon", label: "Red Ribbon", color: "#dc2626" },
  { id: "cream-ribbon", label: "Cream Ribbon", color: "#fef9e7" },
  { id: "lavender-ribbon", label: "Lavender", color: "#c4b5fd" },
  { id: "dual-tone", label: "Dual Tone", color: "#f59e0b" },
  { id: "no-ribbon", label: "No Ribbon", color: "transparent" },
] as const;

export const ARRANGEMENT_POSITIONS = [
  { id: "centered", label: "Centered", description: "Classic center placement" },
  { id: "left-leaning", label: "Left Lean", description: "Tilted left gracefully" },
  { id: "right-leaning", label: "Right Lean", description: "Tilted right elegantly" },
  { id: "vertical-tall", label: "Vertical Tall", description: "Tall dramatic stance" },
  { id: "wide-spread", label: "Wide Spread", description: "Broad, expansive feel" },
  { id: "curved-arc", label: "Curved Arc", description: "Soft curved line" },
  { id: "cascading-down", label: "Cascading", description: "Flowing downward" },
  { id: "fan-shaped", label: "Fan Shape", description: "Spread like a fan" },
  { id: "compact-circular", label: "Compact Circle", description: "Dense round cluster" },
  { id: "asymmetrical-premium", label: "Asymmetrical", description: "Off-center artistry" },
  { id: "scattered-artistic", label: "Scattered", description: "Freestyle scatter" },
  { id: "hero-center", label: "Hero Flower", description: "One flower up front" },
  { id: "layered-background", label: "Layered Depth", description: "Front + back layers" },
] as const;

export const SIZES = [
  { id: "small", label: "Small", description: "Intimate & delicate" },
  { id: "medium", label: "Medium", description: "Perfect balance" },
  { id: "large", label: "Large", description: "Grand & dramatic" },
  { id: "extra-large", label: "Extra Large", description: "Statement piece" },
] as const;

export const DECORATIONS = [
  { id: "sparkles", label: "✨ Sparkles", description: "Magic and shine" },
  { id: "drifting-petals", label: "🌸 Petals", description: "Floating petals" },
  { id: "leafy-stems", label: "🌿 Leaves", description: "Natural green stems" },
  { id: "heart-accents", label: "💕 Hearts", description: "Love hearts" },
  { id: "glow-particles", label: "🌟 Glow", description: "Soft light particles" },
  { id: "confetti", label: "🎊 Confetti", description: "Celebrate!" },
  { id: "dew-drops", label: "💧 Dew", description: "Morning freshness" },
  { id: "elegant-frame", label: "🖼️ Frame", description: "Bordered elegance" },
  { id: "floral-silhouettes", label: "🌺 Silhouettes", description: "Background blooms" },
  { id: "bokeh", label: "🔮 Bokeh", description: "Dreamy light circles" },
] as const;

export const PETAL_DENSITIES = [
  { id: "sparse", label: "Sparse", description: "Airy and light" },
  { id: "medium", label: "Medium", description: "Balanced fullness" },
  { id: "dense", label: "Dense", description: "Lush and full" },
] as const;

export type FlowerType = typeof FLOWER_TYPES[number]["id"];
export type FlowerColor = typeof FLOWER_COLORS[number]["id"];
export type BouquetStyle = typeof BOUQUET_STYLES[number]["id"];
export type WrappingStyle = typeof WRAPPING_STYLES[number]["id"];
export type RibbonStyle = typeof RIBBON_STYLES[number]["id"];
export type ArrangementPosition = typeof ARRANGEMENT_POSITIONS[number]["id"];
export type BouquetSize = typeof SIZES[number]["id"];
export type Decoration = typeof DECORATIONS[number]["id"];

export interface BouquetConfig {
  flowerType: FlowerType;
  flowerColor: FlowerColor;
  bouquetStyle: BouquetStyle;
  wrappingStyle: WrappingStyle;
  ribbonStyle: RibbonStyle;
  decorations: Decoration[];
  size: BouquetSize;
  arrangementPosition: ArrangementPosition;
  petalDensity: string;
  message: string;
}

export const DEFAULT_BOUQUET_CONFIG: BouquetConfig = {
  flowerType: "rose",
  flowerColor: "classic-red",
  bouquetStyle: "small-hand-tied",
  wrappingStyle: "kraft-paper",
  ribbonStyle: "gold-ribbon",
  decorations: ["sparkles"],
  size: "medium",
  arrangementPosition: "centered",
  petalDensity: "medium",
  message: "",
};

export function getColorByID(id: string) {
  return FLOWER_COLORS.find(c => c.id === id) ?? FLOWER_COLORS[0];
}

export function getRibbonByID(id: string) {
  return RIBBON_STYLES.find(r => r.id === id) ?? RIBBON_STYLES[0];
}
