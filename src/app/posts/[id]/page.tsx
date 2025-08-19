// src/app/posts/[id]/page.tsx
import Container from "@/components/Container";
import estilos from "./detalhe-post.module.css";
import { Post } from "@/types/Post";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type DetalhePostProps = {
  params: Promise<{ id: string }>;
};

async function buscarPostPorId(id: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single<Post>();

  /* Esse PGRST116 é um código interno da API Postgre usado pelo Supabase.
  Na prática, indica que se a query single não retornar nenhum item,
  ou seja, zero resultados, ele dispara esse código e com isso chamamos
  a função notFound (que por sua vez carrega a page not-found.tsx). */
  if (error?.code === "PGRST116") {
    notFound();
  }

  if (error) {
    throw new Error("Erro ao buscar post: " + error.message);
  }

  const post: Post = data;
  return post;
}

export async function generateMetadata({ params }: DetalhePostProps) {
  const { id } = await params;
  const post = await buscarPostPorId(id);

  return {
    title: post.titulo + " | PetShop",
    description: post.descricao,
  };
}

export default async function DetalhePost({ params }: DetalhePostProps) {
  const { id } = await params;
  const post: Post = await buscarPostPorId(id);

  const { titulo, categoria, descricao } = post;

  return (
    <article className={estilos.conteudo}>
      <h2> {titulo} </h2>
      <Container>
        <h3> {categoria} </h3>
        <p> {descricao} </p>
      </Container>
    </article>
  );
}
