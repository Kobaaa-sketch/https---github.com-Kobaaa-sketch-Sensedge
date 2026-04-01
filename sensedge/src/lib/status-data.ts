export type ServiceStatus = "operational" | "degraded" | "down" | "maintenance";

export interface Service {
  id: string;
  nameKey: string;
  status: ServiceStatus;
  uptime: number;
  responseTime: number;
  description: string;
  uptimeHistory: ServiceStatus[];
}

export interface Incident {
  id: string;
  title: { fr: string; en: string; de: string; es: string };
  status: "resolved" | "investigating";
  date: string;
  duration?: string;
}

export function generateUptimeHistory(baseStatus: ServiceStatus): ServiceStatus[] {
  const history: ServiceStatus[] = [];
  for (let i = 0; i < 90; i++) {
    const rand = Math.random();
    if (baseStatus === "operational") {
      if (rand < 0.97) history.push("operational");
      else if (rand < 0.99) history.push("degraded");
      else history.push("down");
    } else if (baseStatus === "degraded") {
      if (rand < 0.6) history.push("operational");
      else if (rand < 0.9) history.push("degraded");
      else history.push("down");
    } else {
      history.push(baseStatus);
    }
  }
  return history;
}

export const services: Service[] = [
  {
    id: "api",
    nameKey: "service_api",
    status: "operational",
    uptime: 99.98,
    responseTime: 42,
    description: "REST & GraphQL endpoints",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "dashboard",
    nameKey: "service_dashboard",
    status: "operational",
    uptime: 99.95,
    responseTime: 87,
    description: "Web interface & admin panel",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "notifications",
    nameKey: "service_notifications",
    status: "operational",
    uptime: 99.90,
    responseTime: 120,
    description: "Email, SMS & push alerts",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "database",
    nameKey: "service_database",
    status: "operational",
    uptime: 99.99,
    responseTime: 8,
    description: "PostgreSQL clusters",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "cdn",
    nameKey: "service_cdn",
    status: "degraded",
    uptime: 98.72,
    responseTime: 310,
    description: "Static assets delivery",
    uptimeHistory: generateUptimeHistory("degraded"),
  },
  {
    id: "auth",
    nameKey: "service_auth",
    status: "operational",
    uptime: 99.99,
    responseTime: 35,
    description: "OAuth2 & SSO services",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "monitoring",
    nameKey: "service_monitoring",
    status: "operational",
    uptime: 99.97,
    responseTime: 22,
    description: "Agent & metrics collection",
    uptimeHistory: generateUptimeHistory("operational"),
  },
  {
    id: "webhooks",
    nameKey: "service_webhooks",
    status: "maintenance",
    uptime: 99.80,
    responseTime: 95,
    description: "Event delivery system",
    uptimeHistory: generateUptimeHistory("operational"),
  },
];

export const incidents: Incident[] = [
  {
    id: "inc-001",
    title: {
      fr: "Latence élevée sur le CDN — résolu",
      en: "High CDN latency — resolved",
      de: "Hohe CDN-Latenz — behoben",
      es: "Alta latencia en CDN — resuelto",
    },
    status: "investigating",
    date: "2025-03-27",
  },
  {
    id: "inc-002",
    title: {
      fr: "Maintenance planifiée des Webhooks",
      en: "Scheduled Webhooks maintenance",
      de: "Geplante Webhooks-Wartung",
      es: "Mantenimiento programado de Webhooks",
    },
    status: "investigating",
    date: "2025-03-28",
  },
];
