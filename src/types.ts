export interface StudentProfile {
  id: string;
  name: string;
  maskedName: string;
  studentCode: string;
  bannerId: string;
  career: string;
  campus: string;
  email: string;
  avatarUrl: string;
}

export type TabType = 'inicio' | 'academico' | 'ayuda' | 'perfil';
export type ScreenType = 'main' | 'tiu';
