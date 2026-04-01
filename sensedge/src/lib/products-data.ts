export type CheatStatus = "UNDETECTED" | "UPDATING" | "DOWN" | "SAFE" | "UNKNOWN";

export interface CheatProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  status: CheatStatus;
  link: string;
  variants?: { label: string; price: string }[];
}

export interface GameCategory {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  products: CheatProduct[];
}

const IMG = "https://api.sellauth.com/storage/images/";

export const gameCategories: GameCategory[] = [
  {
    id: "call-of-duty",
    name: "CALL OF DUTY",
    slug: "call-of-duty",
    coverImage: `${IMG}754247.webp`,
    products: [
      {
        id: "cod-1",
        title: "EXTERNAL PRIVATE (Q) BO7 / WZ",
        price: "€12.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/external-private-q-bo7-wz",
        variants: [
          { label: "LICENSE DAY", price: "€12.00" },
          { label: "LICENSE WEEK", price: "€29.99" },
          { label: "LICENSE MONTH", price: "€59.99" },
          { label: "LICENSE LIFETIME", price: "€299.00" },
        ],
      },
      {
        id: "cod-2",
        title: "BO7 / WZ VTLD EXTERNAL",
        price: "€9.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/bo7-wz-vtld-external",
      },
      {
        id: "cod-3",
        title: "DS6 IA / EDITION WZ",
        price: "€60.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/ds6-ia-edition-wz",
      },
      {
        id: "cod-4",
        title: "BO7 BOT LOBBY",
        price: "€7.00",
        image: `${IMG}756327.webp`,
        status: "SAFE",
        link: "https://virtualand.shop/store/call-of-duty/bo7-bot-lobby",
      },
      {
        id: "cod-5",
        title: "NOAH INTERNAL BO7 / BO6 / MW3 / MW2 / WZ",
        price: "€9.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/noah-internal-bo7-bo6-mw3-mw2-warzone",
      },
      {
        id: "cod-6",
        title: "WZ BOT LOBBY",
        price: "€10.00",
        image: `${IMG}756327.webp`,
        status: "SAFE",
        link: "https://virtualand.shop/store/call-of-duty/wz-bot-lobby",
      },
      {
        id: "cod-7",
        title: "DS6 IA / EDITION MULTIPLAYER",
        price: "€60.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/ds6-ia-edition-multiplayer",
      },
      {
        id: "cod-8",
        title: "NO SHADOW BAN BO7 / BO6 / WZ",
        price: "€20.99",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/no-shadow-ban-bo7-bo6-wz",
      },
      {
        id: "cod-9",
        title: "BO7 / WZ UNLOCK ALL",
        price: "€6.00",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/bo7-wz-unlock-all",
      },
      {
        id: "cod-10",
        title: "COD POINTS",
        price: "€12.99",
        image: `${IMG}756327.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/call-of-duty/cod-points",
      },
    ],
  },
  {
    id: "valorant",
    name: "VALORANT",
    slug: "valorant",
    coverImage: `${IMG}754279.webp`,
    products: [
      {
        id: "val-1",
        title: "DS6 IA / EDITION VALORANT",
        price: "€60.00",
        image: `${IMG}756386.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/valorant/ds6-ia-edition-valorant",
      },
      {
        id: "val-2",
        title: "MEW CHAIR ESP",
        price: "€13.50",
        image: `${IMG}756386.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/valorant/mew-chair-esp",
      },
      {
        id: "val-3",
        title: "VALORANT TRIGGER BOT",
        price: "€8.00",
        image: `${IMG}756386.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/valorant/valorant-trigger-bot",
      },
      {
        id: "val-4",
        title: "Akuma - Valorant Cheat",
        price: "€12.00",
        image: `${IMG}756386.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/valorant/akuma-valorant-cheat",
      },
    ],
  },
  {
    id: "fortnite",
    name: "FORTNITE",
    slug: "fortnite",
    coverImage: `${IMG}754264.webp`,
    products: [
      {
        id: "fn-1",
        title: "DS6 IA / EDITION FORTNITE",
        price: "€60.00",
        image: `${IMG}756364.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/fortnite/ds6-ia-edition-fortnite",
      },
      {
        id: "fn-2",
        title: "Ancient: Fortnite Cheat",
        price: "€9.00",
        image: `${IMG}756364.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/fortnite/ancient-fortnite-cheat",
      },
      {
        id: "fn-3",
        title: "Arcane: Fortnite External Cheat",
        price: "€12.00",
        image: `${IMG}756364.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/fortnite/arcane-fortnite-external-cheat",
      },
    ],
  },
  {
    id: "apex-legends",
    name: "APEX LEGENDS",
    slug: "apex-legends",
    coverImage: `${IMG}754248.webp`,
    products: [
      {
        id: "apex-1",
        title: "Arcane: Apex Legends Cheat",
        price: "€12.00",
        image: `${IMG}757526.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/apex-legends/arcane-apex-legends-cheat",
      },
      {
        id: "apex-2",
        title: "Division: Apex Legends Cheat",
        price: "€12.00",
        image: `${IMG}757526.webp`,
        status: "UPDATING",
        link: "https://virtualand.shop/store/apex-legends/division-apex-legends-cheat",
      },
    ],
  },
  {
    id: "counter-strike-2",
    name: "COUNTER STRIKE 2",
    slug: "counter-strike-2",
    coverImage: `${IMG}754253.webp`,
    products: [
      {
        id: "cs2-1",
        title: "Arcane: CS2 Cheat",
        price: "€5.25",
        image: `${IMG}756347.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/counter-strike-2/arcane-cs2-cheat",
      },
    ],
  },
  {
    id: "arc-raiders",
    name: "ARC RAIDERS",
    slug: "arc-raiders",
    coverImage: `${IMG}754249.webp`,
    products: [
      {
        id: "arc-1",
        title: "Yami: ARC Raiders Cheat + Spoofer",
        price: "€12.00",
        image: `${IMG}756343.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/arc-raiders/yami-arc-raiders-cheat-spoofer",
      },
      {
        id: "arc-2",
        title: "Unlock All Arc Raiders Cheat",
        price: "€32.00",
        image: `${IMG}756343.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/arc-raiders/unlock-all-arc-raiders-cheat",
      },
      {
        id: "arc-3",
        title: "Ancient: ARC Raiders Cheat",
        price: "€12.00",
        image: `${IMG}756343.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/arc-raiders/ancient-arc-raiders-cheat",
      },
    ],
  },
  {
    id: "rust",
    name: "RUST",
    slug: "rust",
    coverImage: `${IMG}756382.webp`,
    products: [
      {
        id: "rust-1",
        title: "Ancient: Rust Internal Cheat",
        price: "€7.00",
        image: `${IMG}756382.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rust/ancient-rust-internal-cheat",
      },
      {
        id: "rust-2",
        title: "Division: Rust External Cheat",
        price: "€16.00",
        image: `${IMG}756382.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rust/division-rust-external-cheat",
      },
      {
        id: "rust-3",
        title: "MEK - Rust External Cheat",
        price: "€12.00",
        image: `${IMG}756382.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rust/mek-rust-external-cheat",
      },
    ],
  },
  {
    id: "raimbow-6",
    name: "RAINBOW SIX",
    slug: "raimbow-6",
    coverImage: `${IMG}756374.webp`,
    products: [
      {
        id: "r6-1",
        title: "R6S: Ancient External Cheat",
        price: "€7.50",
        image: `${IMG}756374.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/raimbow-6/r6s-ancient-external-cheat",
      },
      {
        id: "r6-2",
        title: "Akuma - R6 Full Cheat",
        price: "€12.00",
        image: `${IMG}756374.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/raimbow-6/akuma-r6-full-cheat",
      },
      {
        id: "r6-3",
        title: "R6S: Vega External Cheat",
        price: "€12.00",
        image: `${IMG}756374.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/raimbow-6/r6s-vega-external-cheat",
      },
    ],
  },
  {
    id: "pubg",
    name: "PUBG",
    slug: "pubg",
    coverImage: `${IMG}756373.webp`,
    products: [
      {
        id: "pubg-1",
        title: "Arcane: PUBG Cheat",
        price: "€8.00",
        image: `${IMG}756373.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/pubg/arcane-pubg-cheat",
      },
      {
        id: "pubg-2",
        title: "Arcane: PUBG ESP + No Recoil",
        price: "€8.00",
        image: `${IMG}756373.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/pubg/arcane-pubg-esp-no-recoil-cheat",
      },
    ],
  },
  {
    id: "escape-from-tarkov",
    name: "ESCAPE FROM TARKOV",
    slug: "escape-from-tarkov",
    coverImage: `${IMG}785908.webp`,
    products: [
      {
        id: "eft-1",
        title: "Ancient: EFT Chams Cheat",
        price: "€6.75",
        image: `${IMG}785908.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/escape-from-tarkov/ancient-eft-chams-cheat",
      },
    ],
  },
  {
    id: "rocket-league",
    name: "ROCKET LEAGUE",
    slug: "rocket-league",
    coverImage: `${IMG}754275.webp`,
    products: [
      {
        id: "rl-1",
        title: "Brain Bot SSL - Rocket League",
        price: "€14.99",
        image: `${IMG}756376.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rocket-league/brain-bot-ssl-rocket-league",
      },
      {
        id: "rl-2",
        title: "PRIVATE BOT ROCKET LEAGUE 1S",
        price: "€124.99",
        image: `${IMG}756376.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rocket-league/private-bot-rocket-league-1s",
      },
      {
        id: "rl-3",
        title: "MULTIBOT 1v1/2v2/3v3/4v4 SSL",
        price: "€40.00",
        image: `${IMG}756376.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/rocket-league/multibot",
      },
    ],
  },
  {
    id: "marvel-rivals",
    name: "MARVEL RIVALS",
    slug: "marvel-rivals",
    coverImage: `${IMG}756370.webp`,
    products: [
      {
        id: "mv-1",
        title: "Arcane: Marvel Rivals Cheat",
        price: "€8.00",
        image: `${IMG}756370.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/marvel-rivals/arcane-marvel-rivals-cheat",
      },
    ],
  },
  {
    id: "delta-force",
    name: "DELTA FORCE",
    slug: "delta-force",
    coverImage: `${IMG}756350.webp`,
    products: [
      {
        id: "df-1",
        title: "Akuma - Delta Force Cheat (Full)",
        price: "€12.00",
        image: `${IMG}756350.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/delta-force/akuma-delta-force-cheat-full",
      },
      {
        id: "df-2",
        title: "Ancient: Delta Force Cheat",
        price: "€9.00",
        image: `${IMG}756350.webp`,
        status: "DOWN",
        link: "https://virtualand.shop/store/delta-force/ancient-delta-force-cheat",
      },
    ],
  },
  {
    id: "dayz",
    name: "DAYZ",
    slug: "dayz",
    coverImage: `${IMG}756348.webp`,
    products: [
      {
        id: "dayz-1",
        title: "Arcane: Dayz Cheat",
        price: "€8.00",
        image: `${IMG}756348.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/dayz/arcane-dayz-cheat",
      },
    ],
  },
  {
    id: "spoofer-cleaner",
    name: "SPOOFER + CLEANER",
    slug: "spoofer-cleaner",
    coverImage: `${IMG}754290.webp`,
    products: [
      {
        id: "sp-1",
        title: "Perm Spoofer",
        price: "€20.00",
        image: `${IMG}756369.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/spoofer-cleaner/perm-spoofer",
      },
      {
        id: "sp-2",
        title: "Temp HWID & TPM Spoofer",
        price: "€10.00",
        image: `${IMG}756369.webp`,
        status: "UNDETECTED",
        link: "https://virtualand.shop/store/spoofer-cleaner/temp-hwid-tpm-spoofer",
      },
    ],
  },
];
