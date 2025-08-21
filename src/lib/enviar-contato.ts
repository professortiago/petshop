"use server";

import { supabase } from "./supabase";

export async function enviarContato(dadosDoFormulario: FormData) {
  /* Extraindo e tratando os dados de cada campo do formulário */
  const nome = dadosDoFormulario.get("nome")?.toString().trim();
  const email = dadosDoFormulario.get("email")?.toString().trim();
  const mensagem = dadosDoFormulario.get("mensagem")?.toString().trim();

  /* Validação básica no back-end */
  if (!nome || !email || !mensagem) {
    throw new Error("Todos os campos obrigatórios");
  }

  /* Executando o insert através da lib supabase. Capturamos também
  o error para fazer um tratamento básico de erros do Supabase */
  const { error } = await supabase
    .from("contatos")
    .insert({ nome, email, mensagem });

  if (error) {
    throw new Error("Não foi possível enviar sua mensagem. Tente mais tarde.");
  }
}
