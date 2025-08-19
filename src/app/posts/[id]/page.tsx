// src/app/posts/[id]/page.tsx
import Container from "@/components/Container";
import estilos from "./detalhe-post.module.css";
import { Post } from "@/types/Post";
import { notFound } from "next/navigation";

type DetalhePostProps = {
  params: Promise<{ id: string }>;
};

async function buscarPostPorId(id: string): Promise<Post> {
  const resposta = await fetch(`http://localhost:2112/posts/${id}`, {
    next: { revalidate: 0 },
  });

  if (resposta.status === 404) {
    notFound();
  }

  if (!resposta.ok) {
    throw Error("Erro ao buscar o post: " + resposta.statusText);
  }

  const post: Post = await resposta.json();
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
