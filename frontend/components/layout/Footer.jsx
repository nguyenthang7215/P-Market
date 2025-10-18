import { Container } from "../ui/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <Container>
        <div className="py-8 text-center">
          <p>&copy; {new Date().getFullYear()} P-Market. Phát triển bởi Hữu Niêm.</p>
        </div>
      </Container>
    </footer>
  );
}