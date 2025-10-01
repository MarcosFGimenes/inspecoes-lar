// src/lib/templates-schema.ts
import { z } from "zod";

export const templateItemSchema = z.object({
  id: z.string().uuid({ message: "ID do item inv�lido" }).optional(),
  componente: z.string().min(1, "Componente obrigat�rio"),
  oQueChecar: z.string().min(1, "Informe o que checar"),
  instrumento: z.string().min(1, "Informe o instrumento"),
  criterio: z.string().min(1, "Informe o crit�rio"),
  oQueFazer: z.string().min(1, "Informe o que fazer"),
  imagemItemUrl: z.string().url({ message: "URL inv�lida" }).optional(),
  ordem: z.number().int().min(1, "Ordem inv�lida").optional(),
  createdAt: z
    .string()
    .datetime({ offset: true, message: "createdAt inv�lido" })
    .optional(),
});

export const templateSchema = z.object({
  nome: z.string().min(2, "Nome obrigat�rio"),
  imagemUrl: z.string().url({ message: "URL inv�lida" }).optional(),
  itens: z
    .array(templateItemSchema)
    .min(1, "Adicione pelo menos um item"),
});

export type TemplateItemInput = z.infer<typeof templateItemSchema>;
export type TemplateInput = z.infer<typeof templateSchema>;

export type TemplateRecord = TemplateInput & {
  id: string;
  createdAt: string;
  itens: (TemplateItemInput & { id: string; ordem: number; createdAt: string })[];
};
