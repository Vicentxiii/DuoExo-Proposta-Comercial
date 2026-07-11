/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  image: string;
  accentColor: string;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  };
}

export interface StudioMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  description: string;
}

export interface LabParameter {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface ProposalService {
  id: string;
  name: string;
  basePrice: number;
  durationWeeks: number;
  description: string;
}

export interface ProjectScope {
  services: string[];
  animationTier: "minimal" | "premium" | "cinematic";
  timelineWeeks: number;
  estimatedCostRange: [number, number];
}
