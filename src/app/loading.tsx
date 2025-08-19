// src/app/loading.tsx
import Container from "@/components/Container";
import estilos from "./loading.module.css";

export default function Loading() {
  return (
    <section className={estilos.conteudo}>
      <h2>Carregando...</h2>
      <Container>
        <div className={estilos.imagemLoading}>
          <img src="/images/loading.svg" alt="Pacman" />
        </div>
      </Container>
    </section>
  );
}
