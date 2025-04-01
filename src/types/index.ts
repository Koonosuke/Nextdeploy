// types/index.d.ts
export type CsrfTokenResponse = {
  csrf_token: string;
};

export type LoginResponse = {
  token: string;
};

export type UserResponse = {
  id: number;
  username: string;
  userIcon: string;
};

export type UpdateIconResponse = {
  icon_url: string;
};

export interface Experience {
  id: number;
  user_id: number;
  title: string;
  tech_stack: string;
  icon: string;
  content: string;
}

export interface CreateExperienceResponse {
  id: number;
  title: string;
  tech_stack: string;
  icon: string;
  content: string;
}

export interface Career {
  id: number;
  title: string;
  period: string;
  content: string;
  created_at: string;
}
export interface CreateCareerResponse {
  id: number;
  title: string;
  period: string;
  content: string;
  created_at: string;
}

export interface Framework {
  name: string;
  icon: string;
  level: number; // 1〜5でスキルレベル
}

export interface Language {
  name: string;
  icon: string;
  level: number;
  frameworks?: Framework[];
}

export interface Database {
  name: string;
  icon: string;
  level: number;
}

export interface Infrastructure {
  name: string;
  icon: string;
}
