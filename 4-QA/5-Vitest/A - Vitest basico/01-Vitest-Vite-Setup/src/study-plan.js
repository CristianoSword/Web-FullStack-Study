export function buildStudyPlan(modules) {
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0);
  const names = modules.map((module) => module.name);

  return {
    totalLessons,
    summary: `${names.join(", ")} em ${totalLessons} aulas`
  };
}
