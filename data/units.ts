import { Unit } from "@/types";

export const units: Unit[] = [
  {
    id: "unit-1",
    title: "ሀለሐመ",
    subtitle: "Meet your first four letters",
    lessonIds: ["lesson-ha", "lesson-la", "lesson-ha2", "lesson-ma", "lesson-review-1"],
    status: "current",
    themeColor: "bg-amber-200"
  },
  {
    id: "unit-2",
    title: "ሠረሰሸ",
    subtitle: "Coming next",
    lessonIds: [],
    status: "locked",
    themeColor: "bg-sky-200"
  },
  {
    id: "unit-3",
    title: "ቀበቨተቸ",
    subtitle: "Coming later",
    lessonIds: [],
    status: "locked",
    themeColor: "bg-emerald-200"
  }
];
