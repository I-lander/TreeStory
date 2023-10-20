export const WeaponsList = [
  { id: 'sword', life: 4, minStrength: 4, maxStrength: 10 },
  { id: 'shield', life: 7, minStrength: 4, maxStrength: 6 },
  { id: 'bow', life: 2, minStrength: 2, maxStrength: 8 },
];

export interface WeaponProto {
  id: string;
  life: number;
  minStrength: number;
  maxStrength: number;
}
