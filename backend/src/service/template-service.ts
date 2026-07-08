import { prismaClient } from "../application/database";
import type { TemplateResponse } from "../model/template-model";

const getAll = async (): Promise<TemplateResponse[]> => {
  const templates = await prismaClient.template.findMany();

  return templates.map((template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
    animationCode: template.animationCode,
  }));
};

export default { getAll };
